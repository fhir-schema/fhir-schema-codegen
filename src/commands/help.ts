import type { Command as Commander } from 'commander';
import { BaseCommand } from './command';

/**
 * Command to display help information
 */
export class HelpCommand extends BaseCommand {
    /**
     * Register the command with the commander instance
     * @param program - The commander program instance
     */
    register(program: Commander): void {
        program
            .command('help')
            .description('Display help information')
            .action(() => {
                program.help();
            });
    }
}
