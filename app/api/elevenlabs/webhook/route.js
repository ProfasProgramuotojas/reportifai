import conversationEvents from '@/lib/conversationEvents';
import githubService from '@/lib/githubService';

/**
 * ElevenLabs Webhook Handler
 * POST /api/elevenlabs/webhook
 * 
 * Receives tool invocation requests from ElevenLabs Conversational AI
 * and routes them to the appropriate handler function.
 * 
 * Expected payload from ElevenLabs:
 * {
 *   "tool_name": "log_conversation",
 *   "parameters": { ... }
 * }
 */

// Tool handler functions
const toolHandlers = {
  /**
   * Log Conversation Tool
   * Broadcasts real-time status updates to the frontend via SSE
   */
  log_conversation: async (params) => {
    const { status, type = 'info', metadata = {} } = params;

    if (!status) {
      throw new Error('Status is required for log_conversation');
    }

    // Broadcast to all connected SSE clients
    conversationEvents.broadcast({
      status,
      type,
      metadata,
      timestamp: new Date().toISOString(),
    });

    return {
      success: true,
      message: 'Status logged and broadcast to UI',
      data: { status, type },
    };
  },

  /**
   * Get Repository Tree Tool
   * Fetches the ENTIRE directory/file structure from GitHub recursively
   */
  get_repo_tree: async (params) => {
    const { path = '' } = params;

    console.log(`[Tool] get_repo_tree called - fetching full repository structure`);

    // Log to UI
    conversationEvents.broadcast({
      status: 'Loading repository structure...',
      type: 'investigating',
      metadata: { tool: 'get_repo_tree' },
    });

    // Get the full recursive tree
    const tree = await githubService.getFullRepoTree();

    return {
      success: true,
      data: {
        tree: tree,
        total_files: tree.filter(item => item.type === 'file').length,
        total_dirs: tree.filter(item => item.type === 'dir').length,
        message: 'Full repository structure retrieved. Analyze this to find relevant files for the user\'s issue.',
      },
    };
  },

  /**
   * Read File Content Tool
   * Reads specific file content from GitHub
   */
  read_file_content: async (params) => {
    const { file_path, start_line = null, end_line = null } = params;

    if (!file_path) {
      throw new Error('file_path is required for read_file_content');
    }

    console.log(`[Tool] read_file_content called for: ${file_path}`);

    // Log to UI
    conversationEvents.broadcast({
      status: `Reading ${file_path.split('/').pop()}...`,
      type: 'investigating',
      metadata: { tool: 'read_file_content', file_path },
    });

    const fileData = await githubService.readFileContent(
      file_path,
      start_line,
      end_line
    );

    return {
      success: true,
      data: {
        path: fileData.path,
        content: fileData.content,
        size: fileData.size,
        lineRange: fileData.lineRange,
      },
    };
  },

  /**
   * Create GitHub Issue Tool
   * Creates a detailed bug report issue on GitHub
   */
  create_github_issue: async (params) => {
    const {
      title,
      body,
      labels = ['bug'],
      priority = 'medium',
      code_snippet = null,
      file_path = null,
      line_number = null,
    } = params;

    if (!title || !body) {
      throw new Error('title and body are required for create_github_issue');
    }

    console.log(`[Tool] create_github_issue called: ${title}`);

    // Log to UI
    conversationEvents.broadcast({
      status: 'Creating bug report...',
      type: 'resolving',
      metadata: { tool: 'create_github_issue', title },
    });

    // Enhance body with code context if provided
    let enhancedBody = body;
    if (code_snippet || file_path) {
      enhancedBody += '\n\n## Code Context\n\n';
      if (file_path) {
        enhancedBody += `**File**: \`${file_path}\``;
        if (line_number) {
          enhancedBody += ` (Line ${line_number})`;
        }
        enhancedBody += '\n\n';
      }
      if (code_snippet) {
        enhancedBody += '```javascript\n' + code_snippet + '\n```\n';
      }
    }

    const issue = await githubService.createGitHubIssue({
      title,
      body: enhancedBody,
      labels,
      priority,
    });

    // Log success to UI
    conversationEvents.broadcast({
      status: 'Bug report created successfully',
      type: 'resolved',
      metadata: {
        tool: 'create_github_issue',
        issue_number: issue.number,
        issue_url: issue.url,
      },
    });

    return {
      success: true,
      data: {
        issue_number: issue.number,
        issue_url: issue.url,
        message: 'Issue created successfully',
      },
    };
  },
};

/**
 * Main webhook handler
 */
export async function POST(request) {
  try {
    const payload = await request.json();
    console.log('[Webhook] Received payload:', JSON.stringify(payload, null, 2));

    // ElevenLabs sends parameters directly without tool_name wrapper
    // Detect tool based on parameters present
    let tool_name = payload.tool_name;
    let parameters = payload.parameters || payload;

    // Auto-detect tool if not specified
    if (!tool_name) {
      if (parameters.status && parameters.type) {
        tool_name = 'log_conversation';
      } else if (parameters.path !== undefined && !parameters.file_path) {
        tool_name = 'get_repo_tree';
      } else if (parameters.file_path && !parameters.title) {
        tool_name = 'read_file_content';
      } else if (parameters.title && parameters.body) {
        tool_name = 'create_github_issue';
      }
    }

    if (!tool_name) {
      return Response.json(
        {
          success: false,
          error: 'Could not determine tool_name. Received parameters: ' + Object.keys(parameters).join(', '),
        },
        { status: 400 }
      );
    }

    // Get the appropriate handler
    const handler = toolHandlers[tool_name];

    if (!handler) {
      console.error(`[Webhook] Unknown tool: ${tool_name}`);
      return Response.json(
        {
          success: false,
          error: `Unknown tool: ${tool_name}`,
          available_tools: Object.keys(toolHandlers),
        },
        { status: 400 }
      );
    }

    // Execute the tool
    console.log(`[Webhook] Executing tool: ${tool_name}`);
    const result = await handler(parameters);

    console.log(`[Webhook] Tool ${tool_name} completed successfully`);
    
    // Return in format ElevenLabs expects
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('[Webhook] Error:', error);
    console.error('[Webhook] Error stack:', error.stack);

    // Log error to UI
    conversationEvents.broadcast({
      status: 'An error occurred during investigation',
      type: 'error',
      metadata: { error: error.message },
    });

    // Return error in format ElevenLabs expects
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    }), {
      status: 200, // Return 200 even on error so ElevenLabs doesn't retry
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

/**
 * Health check endpoint
 */
export async function GET(request) {
  return Response.json({
    status: 'operational',
    tools: Object.keys(toolHandlers),
    timestamp: new Date().toISOString(),
  });
}
