import { type Command as Commander, Option } from 'commander';
import fs, { existsSync } from 'node:fs';
import path from 'node:path';
import { GeneratorError, generatorsRegistry } from '../generators-registry';
import { logger } from '../logger';
import { executeTypeSchema, TYPE_SCHEMA_VERSION } from '../utils/type-schema';
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

        const filesOption = new Option(
            '-f, --files <files...>',
            'TypeSchema source *.ngjson files',
        ).conflicts('packages');

        const packageOption = new Option(
            '-p, --packages <names...>',
            'Source fhir packages (example: hl7.fhir.r4.core@4.0.1)',
        ).conflicts('files');

        program
            .command('generate')
            .description('Generate code from FHIR Schema')
            .addOption(option)
            .addOption(filesOption)
            .addOption(packageOption)
            .requiredOption('-o, --output <directory>', 'Output directory')
            .option('--custom-generator <path>', 'Additional path to look for custom generators')
            .option(
                '--types-only',
                'Generate only type definitions directly in the output directory',
            )
            .option(
                '--type-schema-exec <command>',
                'Custom command to execute type-schema (e.g. "java --jar type-schema.jar")',
            )
            .option('--fhir-schema <paths...>', 'Additional FHIR schema files to include')
            .option(
                '--py-sdk-package <n>',
                'Root package name for Python package hierarchy (e.g., "fhirsdk" or "aidbox.my_package")',
                'fhirsdk',
            )
            .option(
                '--py-allow-extra-fields',
                'Allow extra fields in Python resource models without validation (default: false, extra fields are forbidden)',
            )
            .hook('preSubcommand', (thisCommand) => {
                const options = thisCommand.opts();
                if (!options.files && !options.packages) {
                    logger.error('Either --files or --packages must be specified');
                    process.exit(1);
                }
            })
            .hook('preAction', async (thisCommand: Commander) => {
                try {
                    const options = thisCommand.opts();

                    await generatorsRegistry.initialize();

                    if (options.customGenerator) {
                        generatorsRegistry.addCustomGeneratorPath(options.customGenerator);
                        await generatorsRegistry.discoverCustomGenerators();
                    }

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

                    if (options.files) {
                        const files = options.files;
                        for (const file of files) {
                            const filePath = path.resolve(file);
                            if (!existsSync(filePath)) {
                                logger.error(`Input file doesn't exist: ${filePath}`);
                                process.exit(1);
                            }
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

                    if (options.packages) {
                        logger.info('Processing packages with type-schema...');

                        try {
                            const result = await executeTypeSchema(
                                options.packages,
                                TYPE_SCHEMA_VERSION,
                                options.typeSchemaExec,
                                options.fhirSchema,
                            );

                            if (result) {
                                const generator = await generatorsRegistry.createGenerator(
                                    options.generator ?? options.customGenerator,
                                    {
                                        outputDir,
                                        jsonDocuments: result,
                                        typesOnly: options.typesOnly,
                                        ...(options.generator === 'python'
                                            ? {
                                                  sdkPackage: options.pySdkPackage,
                                                  allowExtraFields: options.pyAllowExtraFields,
                                              }
                                            : {}),
                                        ...(options.generator === 'typescript'
                                            ? {
                                                  sdkPackage: options.tsSdkPackage,
                                              }
                                            : {}),
                                    },
                                );

                                await generator.init();
                                generator.generate();
                            }
                        } catch (error) {
                            logger.error(
                                `${error instanceof Error ? error.message : String(error)}`,
                            );
                            throw new Error(
                                `Failed to process packages with type-schema: ${error instanceof Error ? error.message : String(error)}`,
                            );
                        }
                    }

                    if (options.files) {
                        const generator = await generatorsRegistry.createGenerator(
                            options.generator ?? options.customGenerator,
                            {
                                outputDir,
                                files: options.files,
                                typesOnly: options.typesOnly,
                                ...(options.generator === 'python'
                                    ? {
                                          sdkPackage: options.pySdkPackage,
                                          allowExtraFields: options.pyAllowExtraFields,
                                      }
                                    : {}),
                                ...(options.generator === 'typescript'
                                    ? {
                                          sdkPackage: options.tsSdkPackage,
                                      }
                                    : {}),
                            },
                        );

                        await generator.init();
                        generator.generate();
                    }

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
