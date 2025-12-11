import conversationEvents from '@/lib/conversationEvents';
import githubService from '@/lib/githubService';

/**
 * create_github_issue Tool Endpoint
 * POST /api/elevenlabs/create-github-issue
 */
export async function POST(request) {
  try {
    const params = await request.json();
    console.log('[create_github_issue] Received:', JSON.stringify(params, null, 2));

    const { 
      title, 
      body, 
      labels = [], 
      priority = 'medium',
      code_snippet = null,
      file_path = null,
      line_number = null
    } = params;

    if (!title || !body) {
      return new Response(JSON.stringify({
        success: false,
        error: 'title and body are required',
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Log to UI
    conversationEvents.broadcast({
      status: 'Creating bug report...',
      type: 'resolving',
      metadata: { tool: 'create_github_issue' },
    });

    // Enhance the issue body with metadata
    let enhancedBody = body;

    if (file_path || line_number || code_snippet) {
      enhancedBody += '\n\n---\n\n### 📍 Location\n\n';
      
      if (file_path) {
        enhancedBody += `**File:** \`${file_path}\`\n`;
      }
      
      if (line_number) {
        enhancedBody += `**Line:** ${line_number}\n`;
      }
      
      if (code_snippet) {
        enhancedBody += '\n**Code:**\n```javascript\n' + code_snippet + '\n```\n';
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

    return new Response(JSON.stringify({
      success: true,
      data: {
        issue_number: issue.number,
        issue_url: issue.url,
        message: 'Issue created successfully',
      },
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('[create_github_issue] Error:', error);
    
    conversationEvents.broadcast({
      status: 'Error creating bug report',
      type: 'error',
      metadata: { error: error.message },
    });

    return new Response(JSON.stringify({
      success: false,
      error: error.message,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
