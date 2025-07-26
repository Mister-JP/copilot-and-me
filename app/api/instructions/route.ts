import { readFile } from 'fs/promises';
import { join } from 'path';
import { logger } from '@/lib/rotating-logger';

export async function GET() {
  const startTime = Date.now();

  try {
    logger.info('Instructions request started');

    const instructionsPath = join(
      process.cwd(),
      '.github',
      'copilot-instructions.md'
    );
    const content = await readFile(instructionsPath, 'utf-8');

    const duration = Date.now() - startTime;
    logger.info('Instructions request completed', {
      duration: `${duration}ms`,
      contentLength: content.length,
    });

    return new Response(content, {
      headers: { 'Content-Type': 'text/plain' },
    });
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Instructions request failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
      duration: `${duration}ms`,
    });

    return new Response('instructions not found', { status: 404 });
  }
}
