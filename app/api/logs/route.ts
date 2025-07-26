import { NextResponse } from 'next/server'
import { logger } from '@/lib/rotating-logger'

export async function GET() {
  try {
    const stats = await logger.getStats()
    
    logger.info('Log stats requested', { 
      fileCount: stats.fileCount,
      totalSize: stats.totalSize 
    })
    
    return NextResponse.json({
      status: 'healthy',
      logRotation: {
        enabled: true,
        maxDays: 7,
        maxFileSize: '10MB',
        currentStats: stats
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    logger.error('Log stats request failed', { 
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    
    return NextResponse.json(
      { error: 'Stats unavailable' }, 
      { status: 500 }
    )
  }
}

// Manual cleanup trigger
export async function POST() {
  try {
    await logger.cleanup()
    const stats = await logger.getStats()
    
    logger.info('Manual log cleanup completed', { 
      remainingFiles: stats.fileCount 
    })
    
    return NextResponse.json({
      message: 'Cleanup completed',
      stats
    })
  } catch (error) {
    logger.error('Manual cleanup failed', { 
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    
    return NextResponse.json(
      { error: 'Cleanup failed' }, 
      { status: 500 }
    )
  }
}
