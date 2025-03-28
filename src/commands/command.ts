import type { Command as Commander } from 'commander';

/**
 * Interface that all commands must implement
 */
export interface Command {
    /**
     * Register the command with the commander instance
     * @param program - The commander program instance
     */
    register(program: Commander): void;
}

/**
 * Base abstract class for commands
 */
export abstract class BaseCommand implements Command {
    /**
     * Register the command with the commander instance
     * @param program - The commander program instance
     */
    abstract register(program: Commander): void;
}
