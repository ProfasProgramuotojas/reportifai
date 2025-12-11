import conversationEvents from '@/lib/conversationEvents';
import githubService from '@/lib/githubService';

/**
 * get_repo_tree Tool Endpoint
 * POST /api/elevenlabs/get-repo-tree
 */
export async function POST(request) {
  try {
    const params = await request.json();
    console.log('[get_repo_tree] Received:', JSON.stringify(params, null, 2));

    // Log to UI
    conversationEvents.broadcast({
      status: 'Loading repository structure...',
      type: 'investigating',
      metadata: { tool: 'get_repo_tree' },
    });

    // Get the full recursive tree
    const tree = await githubService.getFullRepoTree();

    return new Response(JSON.stringify({
      success: true,
      data: {
        tree: tree,
        total_files: tree.filter(item => item.type === 'file').length,
        total_dirs: tree.filter(item => item.type === 'dir').length,
        message: 'Full repository structure retrieved. Analyze this to find relevant files for the user\'s issue.',
      },
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('[get_repo_tree] Error:', error);
    
    conversationEvents.broadcast({
      status: 'Error loading repository structure',
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
