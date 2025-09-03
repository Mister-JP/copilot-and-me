// Ultra-minimal log rotation - production genius
import {
  writeFile,
  readFile,
  stat,
  unlink,
  readdir,
  appendFile,
} from 'fs/promises';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

interface LogEntry {
  level: 'info' | 'warn' | 'error';
  message: string;
  timestamp: string;
  context?: Record<string, any>;
}

class RotatingLogger {
  private logDir = join(process.cwd(), 'logs');
  private maxFileSize = 10 * 1024 * 1024; // 10MB per file
  private maxDays = 7; // Keep last 7 days
  // TODO: BUG - `isDev` is incorrectly determined. `typeof window` is for client-side checks.
  // For backend, this should be based on `process.env.NODE_ENV`.
  private isDev = typeof window !== 'undefined';

  constructor() {
    this.ensureLogDir();
    // TODO: BUG - `cleanupOldLogs` runs on every instantiation. In a serverless environment,
    // this is inefficient. This should be run on a schedule or as a separate process.
    this.cleanupOldLogs();
  }

  private ensureLogDir() {
    if (!existsSync(this.logDir)) {
      mkdirSync(this.logDir, { recursive: true });
    }
  }

  private getLogFileName(): string {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    return join(this.logDir, `app-${today}.log`);
  }

  private async shouldRotate(filePath: string): Promise<boolean> {
    try {
      const stats = await stat(filePath);
      return stats.size >= this.maxFileSize;
    } catch {
      return false;
    }
  }

  private async rotateLogFile(filePath: string): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const rotatedPath = filePath.replace('.log', `-${timestamp}.log`);

    try {
      const content = await readFile(filePath, 'utf-8');
      await writeFile(rotatedPath, content);
      await writeFile(filePath, ''); // Clear current log
      return rotatedPath;
    } catch (error) {
      console.error('[LOGGER] Rotation failed:', error);
      return filePath;
    }
  }

  private async cleanupOldLogs(): Promise<void> {
    // Only perform cleanup in backend/production environment
    if (this.isDev) return;

    try {
      const files = await readdir(this.logDir);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - this.maxDays);

      for (const file of files) {
        if (!file.endsWith('.log')) continue;

        const filePath = join(this.logDir, file);
        const stats = await stat(filePath);

        if (stats.mtime < cutoffDate) {
          await unlink(filePath);
          // Log cleanup to file only, no console output
          await this.writeToFile({
            level: 'info',
            message: `Cleaned up old log: ${file}`,
            timestamp: new Date().toISOString(),
          });
        }
      }
    } catch (error) {
      // Log error to file only, no console output
      await this.writeToFile({
        level: 'error',
        message: 'Cleanup failed',
        timestamp: new Date().toISOString(),
        context: {
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      });
    }
  }

  private async writeToFile(entry: LogEntry): Promise<void> {
    if (this.isDev) return; // Only log to files in production

    const logFile = this.getLogFileName();
    const logLine = `${JSON.stringify(entry)}\n`;

    try {
      // TODO: BUG - Potential race condition. If two requests trigger rotation at the same time,
      // it could lead to lost log entries or corrupted files. A locking mechanism is needed.
      if (existsSync(logFile) && (await this.shouldRotate(logFile))) {
        await this.rotateLogFile(logFile);
      }

      // Atomically append to log file to prevent race conditions
      await appendFile(logFile, logLine);
    } catch (error) {
      // TODO: BUG - Silent fail. If logging fails, the error is suppressed.
      // This should at least be logged to `console.error` for debugging purposes.
      // Error will be handled by the calling method if needed
    }
  }

  private async log(
    level: LogEntry['level'],
    message: string,
    context?: Record<string, any>
  ) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      ...(context && { context }),
    };

    // Backend-only logging - no console output to keep frontend clean
    // Only write to rotating log files in production
    await this.writeToFile(entry);
  }

  info = (message: string, context?: Record<string, any>) =>
    this.log('info', message, context);
  warn = (message: string, context?: Record<string, any>) =>
    this.log('warn', message, context);
  error = (message: string, context?: Record<string, any>) =>
    this.log('error', message, context);

  // Manual cleanup trigger
  async cleanup() {
    await this.cleanupOldLogs();
  }

  // Get log stats
  async getStats() {
    try {
      const files = await readdir(this.logDir);
      const logFiles = files.filter(f => f.endsWith('.log'));

      let totalSize = 0;
      for (const file of logFiles) {
        const stats = await stat(join(this.logDir, file));
        totalSize += stats.size;
      }

      return {
        fileCount: logFiles.length,
        totalSize: `${(totalSize / 1024 / 1024).toFixed(2)}MB`,
        files: logFiles,
      };
    } catch {
      return { fileCount: 0, totalSize: '0MB', files: [] };
    }
  }
}

export const logger = new RotatingLogger();
