type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

const levelRank: Record<LogLevel, number> = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
};

export class Logger {
  private readonly minLevel: LogLevel;

  constructor(private context: string) {
    const raw = (process.env.LOG_LEVEL ?? 'INFO').toUpperCase() as LogLevel;
    this.minLevel = levelRank[raw] !== undefined ? raw : 'INFO';
  }

  private log(level: LogLevel, message: string, data?: unknown): void {
    if (levelRank[level] < levelRank[this.minLevel]) return;
    const ts = new Date().toISOString();
    const entry = `[${ts}] [${level}] [${this.context}] ${message}`;
    console.log(data ? `${entry} ${JSON.stringify(data, null, 2)}` : entry);
  }

  debug(message: string, data?: unknown): void { this.log('DEBUG', message, data); }
  info(message: string, data?: unknown): void  { this.log('INFO',  message, data); }
  warn(message: string, data?: unknown): void  { this.log('WARN',  message, data); }
  error(message: string, data?: unknown): void { this.log('ERROR', message, data); }
}
