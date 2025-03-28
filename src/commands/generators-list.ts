import type { Command as Commander } from 'commander';
import pc from 'picocolors';
import { generatorsRegistry } from '../generators-registry';
import { logger } from '../logger';
import { BaseCommand } from './command';

/**
 * Command to list all available generators
 */
export class GeneratorsListCommand extends BaseCommand {
    /**
     * Register the command with the commander instance
     * @param program - The commander program instance
     */
    register(program: Commander): void {
        program
            .command('generators')
            .description('List all available generators')
            .action(async () => {
                try {
                    await generatorsRegistry.initialize();
                    const generators = generatorsRegistry.getAll();

                    if (generators.length === 0) {
                        logger.info('No generators found.');
                        return;
                    }

                    logger.info('Available generators:');
                    logger.info('');

                    // Group by built-in vs custom
                    const builtIn = generators.filter((g) => g.isBuiltIn);
                    const custom = generators.filter((g) => !g.isBuiltIn);

                    if (builtIn.length > 0) {
                        logger.infoHighlight('Built-in generators:');
                        logger.info(
                            logger.formatList(
                                builtIn,
                                (gen) => `${pc.bold(gen.name)} - ${gen.description}`,
                            ),
                        );
                        logger.info('');
                    }

                    if (custom.length > 0) {
                        logger.infoHighlight('Custom generators:');
                        logger.info(
                            logger.formatList(custom, (gen) => [
                                `${pc.bold(gen.name)} - ${gen.description}`,
                                `Path: ${gen.path}`,
                            ]),
                        );
                    }
                } catch (error) {
                    this.handleError(error);
                }
            });
    }

    /**
     * Handle errors in a consistent way for all commands
     * @param error - Error object
     */
    private handleError(error: unknown): never {
        logger.error(`Error: ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
    }
}
