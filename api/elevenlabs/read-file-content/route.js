import conversationEvents from '@/lib/conversationEvents';
import githubService from '@/lib/githubService';

/**
 * read_file_content Tool Endpoint
 * POST /api/elevenlabs/read-file-content
 */
export async function POST(request) {
  try {
    const params = await request.json();
    console.log('[read_file_content] Received:', JSON.stringify(params, null, 2));

    const { file_path, start_line = null, end_line = null } = params;

    if (!file_path) {
      return new Response(JSON.stringify({
        success: false,
        error: 'file_path is required',
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Log to UI
    conversationEvents.broadcast({
      status: `Reading ${file_path}...`,
      type: 'investigating',
      metadata: { tool: 'read_file_content', file_path },
    });

    const fileData = await githubService.readFileContent(file_path, start_line, end_line);

    return new Response(JSON.stringify({
      success: true,
      data: fileData,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('[read_file_content] Error:', error);
    
    conversationEvents.broadcast({
      status: 'Error reading file',
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
