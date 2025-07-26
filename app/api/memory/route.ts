import { readFile } from 'fs/promises';
import { join } from 'path';
import { logger } from '@/lib/rotating-logger';

export async function GET() {
  const startTime = Date.now();

  try {
    logger.info('Memory request started');

    const memoryPath = join(process.cwd(), 'memory_notepad.md');
    const content = await readFile(memoryPath, 'utf-8');

    const duration = Date.now() - startTime;
    logger.info('Memory request completed', {
      duration: `${duration}ms`,
      contentLength: content.length,
    });

    return new Response(content, {
      headers: { 'Content-Type': 'text/plain' },
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Memory request failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
      duration: `${duration}ms`,
    });

    return new Response('memory not found', { status: 404 });
  }
}
