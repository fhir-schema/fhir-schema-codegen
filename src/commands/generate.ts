import { type Command as Commander, Option } from 'commander';
import { mkdir } from 'fs';
import { exec, spawn } from 'node:child_process';
import fs, { existsSync } from 'node:fs';
import path from 'node:path';
import { arch, platform } from 'os';
import { join } from 'path';
import { promisify } from 'util';
import { GeneratorError, generatorsRegistry } from '../generators-registry';
import { logger } from '../logger';
import { BaseCommand } from './command';

const execAsync = promisify(exec);

interface BinaryInfo {
    url: string;
    name: string;
}

const TYPE_SCHEMA_VERSION = '0.0.5';

const BINARIES: Record<string, BinaryInfo> = {
    'darwin-arm64': {
        url: `https://github.com/fhir-clj/type-schema/releases/download/v${TYPE_SCHEMA_VERSION}/type-schema-macos-arm64`,
        name: 'type-schema',
    },
    'darwin-x64': {
        url: `https://github.com/fhir-clj/type-schema/releases/download/v${TYPE_SCHEMA_VERSION}/type-schema-macos`,
        name: 'type-schema',
    },
    'linux-arm64': {
        url: `https://github.com/fhir-clj/type-schema/releases/download/v${TYPE_SCHEMA_VERSION}/type-schema-linux-arm64`,
        name: 'type-schema',
    },
    'linux-x64': {
        url: `https://github.com/fhir-clj/type-schema/releases/download/v${TYPE_SCHEMA_VERSION}/type-schema-linux`,
        name: 'type-schema',
    },
    win32: {
        url: `https://github.com/fhir-clj/type-schema/releases/download/v${TYPE_SCHEMA_VERSION}/type-schema-windows.exe`,
        name: 'type-schema.exe',
    },
};

async function downloadBinary(url: string, destination: string): Promise<void> {
    try {
        console.log(`Downloading from ${url} to ${destination}...`);
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to download: ${response.statusText}`);
        }

        const buffer = await response.arrayBuffer();
        await fs.promises.writeFile(destination, Buffer.from(buffer));

        console.log('The type-schema binary was downloaded successfully');
    } catch (error) {
        console.error('Download failed:', error);
        throw error;
    }
}

async function ensureBinaryExists(): Promise<string> {
    const os = platform();
    const architecture = arch();
    const platformKey = `${os}-${architecture}`;

    const binaryInfo = BINARIES[platformKey];

    if (!binaryInfo) {
        throw new Error(`Unsupported platform: ${platformKey}`);
    }

    const binDir = join(__dirname, '..', '..', 'bin');
    const binaryPath = join(binDir, binaryInfo.name);

    if (!existsSync(binDir)) {
        await promisify(mkdir)(binDir, { recursive: true });
    }

    if (!existsSync(binaryPath)) {
        console.log(`Downloading the type-schema binary for ${platformKey}...`);
        await downloadBinary(binaryInfo.url, binaryPath);

        if (os !== 'win32') {
            await execAsync(`chmod +x ${binaryPath}`);
        }
    }

    if (os !== 'win32' && !isExecutable(binaryPath)) {
        await execAsync(`chmod +x ${binaryPath}`);
    }

    return binaryPath;
}

function isExecutable(filePath: string): boolean {
    try {
        fs.accessSync(filePath, fs.constants.X_OK);
        return true;
    } catch {
        return false;
    }
}

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
                            const binaryPath = await ensureBinaryExists();

                            const process = spawn(binaryPath, options.packages, {
                                stdio: 'pipe',
                                shell: false,
                            });

                            let stdout = '';
                            let stderr = '';

                            process.stdout.on('data', (data) => {
                                stdout += data.toString();
                            });

                            process.stderr.on('data', (data) => {
                                stderr += data.toString();
                            });

                            const result = await new Promise((resolve, reject) => {
                                process.on('close', (code) => {
                                    if (code === 0) {
                                        resolve(stdout);
                                    } else {
                                        reject(
                                            new Error(
                                                `Process exited with code ${code}\n${stderr}`,
                                            ),
                                        );
                                    }
                                });

                                process.on('error', (error) => {
                                    reject(error);
                                });
                            });

                            if (stderr && stderr.trim()) {
                                logger.warn(`JAR process stderr: ${stderr}`);
                            }

                            if (result) {
                                const generator = await generatorsRegistry.createGenerator(
                                    options.generator ?? options.customGenerator,
                                    {
                                        outputDir,
                                        jsonDocuments: result.toString(),
                                    },
                                );

                                await generator.init();
                                generator.generate();
                            }
                        } catch (error) {
                            console.log(error);
                            throw new Error(
                                `Failed to process packages with type-schema.jar: ${error instanceof Error ? error.message : String(error)}`,
                            );
                        }
                    }

                    if (options.files) {
                        const generator = await generatorsRegistry.createGenerator(
                            options.generator ?? options.customGenerator,
                            {
                                outputDir,
                                files: options.files,
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
