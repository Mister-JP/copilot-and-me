import { NextResponse } from 'next/server';
import { readdir } from 'fs/promises';
import { join } from 'path';
import { logger } from '@/lib/rotating-logger';

export async function GET() {
  const startTime = Date.now();

  try {
    logger.info('Repository listing request started');

    const repoPath = join(process.cwd(), 'repo_analysis');
    const repos = await readdir(repoPath);
    const filteredRepos = repos.filter(repo => !repo.startsWith('.'));

    const duration = Date.now() - startTime;
    logger.info('Repository listing completed', {
      duration: `${duration}ms`,
      repoCount: filteredRepos.length,
    });

    return NextResponse.json(filteredRepos);
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error('Repository listing failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
      duration: `${duration}ms`,
    });

    return NextResponse.json([]);
  }
}
