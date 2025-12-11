import conversationEvents from '@/lib/conversationEvents';

/**
 * SSE Endpoint for Real-Time Conversation Updates
 * GET /api/sse/conversation
 * 
 * Establishes a Server-Sent Events connection that pushes
 * real-time updates when the AI agent uses the log_conversation tool.
 */
export async function GET(request) {
  // Set up SSE headers
  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  const encoder = new TextEncoder();

  // Custom response object to match our event emitter interface
  const sseClient = {
    write: (data) => {
      writer.write(encoder.encode(data));
    }
  };

  // Add this client to the event emitter
  conversationEvents.addClient(sseClient);

  // Send initial connection message
  sseClient.write(`data: ${JSON.stringify({
    type: 'connected',
    status: 'Connected to conversation stream',
    timestamp: new Date().toISOString()
  })}\n\n`);

  // Handle client disconnect
  request.signal.addEventListener('abort', () => {
    console.log('[SSE] Client aborted connection');
    conversationEvents.removeClient(sseClient);
    writer.close();
  });

  return new Response(responseStream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no', // Disable nginx buffering
    },
  });
}
