import pc from 'picocolors';

/**
 * Logger levels
 */
export enum LogLevel {
    NONE = 0,
    ERROR = 1,
    WARN = 2,
    INFO = 3,
    DEBUG = 4,
}

/**
 * Logger utility for consistent console output.
 */
export class Logger {
    private currentLevel: LogLevel;

    /**
     * Creates a new Logger instance.
     * @param level - Initial log level
     */
    constructor(level: LogLevel = LogLevel.INFO) {
        this.currentLevel = level;
    }

    /**
     * Sets the log level.
     * @param level - New log level
     */
    setLevel(level: LogLevel): void {
        this.currentLevel = level;
    }

    /**
     * Logs an error message.
     * @param message - Message to log
     */
    error(message: string): void {
        if (this.currentLevel >= LogLevel.ERROR) {
            process.stderr.write(pc.red(`ERROR: ${message}\n`));
        }
    }

    /**
     * Logs a warning message.
     * @param message - Message to log
     */
    warn(message: string): void {
        if (this.currentLevel >= LogLevel.WARN) {
            process.stderr.write(pc.yellow(`WARN: ${message}\n`));
        }
    }

    /**
     * Logs an info message.
     * @param message - Message to log
     */
    info(message: string): void {
        if (this.currentLevel >= LogLevel.INFO) {
            process.stdout.write(`${message}\n`);
        }
    }

    /**
     * Logs an info message with highlighting.
     * @param message - Message to log
     */
    infoHighlight(message: string): void {
        if (this.currentLevel >= LogLevel.INFO) {
            process.stdout.write(pc.cyan(`${message}\n`));
        }
    }

    /**
     * Logs a success message.
     * @param message - Message to log
     */
    success(message: string): void {
        if (this.currentLevel >= LogLevel.INFO) {
            process.stdout.write(pc.green(`${message}\n`));
        }
    }

    /**
     * Logs a debug message.
     * @param message - Message to log
     */
    debug(message: string): void {
        if (this.currentLevel >= LogLevel.DEBUG) {
            process.stdout.write(pc.gray(`DEBUG: ${message}\n`));
        }
    }

    /**
     * Formats a list of items for display.
     * @param items - Array of items to format
     * @param mapper - Function to map each item to a string or array of strings
     * @returns Formatted list as string
     */
    formatList<T>(items: T[], mapper: (item: T) => string | string[]): string {
        return items
            .map((item) => {
                const result = mapper(item);
                if (Array.isArray(result)) {
                    return result.map((line) => `  ${line}`).join('\n');
                }
                return `  ${result}`;
            })
            .join('\n');
    }
}

// Export a singleton instance
export const logger = new Logger();
