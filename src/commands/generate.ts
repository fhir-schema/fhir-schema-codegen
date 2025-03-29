import { type Command as Commander, Option } from 'commander';
import fs, { existsSync } from 'node:fs';
import path from 'node:path';
import { GeneratorError, generatorsRegistry } from '../generators-registry';
import { logger } from '../logger';
import { BaseCommand } from './command';

/**
 * Command to generate code from FHIR schema
 */
export class GenerateCommand extends BaseCommand {
    /**
     * Register the command with the commander instance
     * @param program - The commander program instance
     */
    register(program: Commander): void {
        const option = new Option('-g, --generator <name>', 'Generator to use').conflicts(
            'custom-generator',
        );
        program
            .command('generate')
            .description('Generate code from FHIR Schema')
            .addOption(option)
            .requiredOption('-o, --output <directory>', 'Output directory')
            .requiredOption('-f, --files <files...>', 'TypeSchema source *.ngjson files')
            .option('--custom-generator <path>', 'Additional path to look for custom generators')
            .hook('preAction', async (thisCommand: Commander) => {
                try {
                    const options = thisCommand.opts();

                    // Initialize the registry
                    await generatorsRegistry.initialize();

                    // Add custom generator path if provided
                    if (options.customGenerator) {
                        generatorsRegistry.addCustomGeneratorPath(options.customGenerator);
                        await generatorsRegistry.discoverCustomGenerators();
                    }

                    // Validate generator name
                    const generator = generatorsRegistry.get(
                        options.generator,
                        options.customGenerator,
                    );
                    if (!generator) {
                        const availableGenerators = generatorsRegistry.getGeneratorNames();
                        logger.error(`Unknown generator: ${options.generator}`);
                        logger.warn(`Available generators: ${availableGenerators.join(', ')}`);
                        logger.warn(`Run 'fscg generators' to see all available generators`);
                        process.exit(1);
                    }

                    // Validate input files
                    const files = options.files;
                    for (const file of files) {
                        const filePath = path.resolve(file);
                        if (!existsSync(filePath)) {
                            logger.error(`Input file doesn't exist: ${filePath}`);
                            process.exit(1);
                        }
                    }
                } catch (error) {
                    this.handleError(error);
                }
            })
            .action(async (options) => {
                try {
                    const outputDir = path.resolve(process.cwd(), options.output);

                    if (!fs.existsSync(outputDir)) {
                        fs.mkdirSync(outputDir, { recursive: true });
                    }

                    logger.infoHighlight(
                        `Starting code generation with ${options.generator ?? options.customGenerator} generator...`,
                    );

                    // Create and use the generator
                    const generator = await generatorsRegistry.createGenerator(
                        options.generator ?? options.customGenerator,
                        {
                            outputDir,
                            files: options.files,
                        },
                    );

                    await generator.init();
                    generator.generate();

                    logger.success(`Successfully generated code to ${options.output}`);
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
        if (error instanceof GeneratorError) {
            logger.error(`Generator error: ${error.message}`);
        } else {
            logger.error(`Error: ${error instanceof Error ? error.message : String(error)}`);
        }
        process.exit(1);
    }
}
