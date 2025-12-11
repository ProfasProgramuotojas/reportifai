import conversationEvents from '@/lib/conversationEvents';

/**
 * log_conversation Tool Endpoint
 * POST /api/elevenlabs/log-conversation
 */
export async function POST(request) {
  try {
    const params = await request.json();
    console.log('[log_conversation] Received:', JSON.stringify(params, null, 2));

    const { status, type = 'info', metadata = {} } = params;

    if (!status) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Status is required',
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Broadcast to all connected SSE clients
    conversationEvents.broadcast({
      status,
      type,
      metadata,
      timestamp: new Date().toISOString(),
    });

    return new Response(JSON.stringify({
      success: true,
      message: 'Status logged and broadcast to UI',
      data: { status, type },
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('[log_conversation] Error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
