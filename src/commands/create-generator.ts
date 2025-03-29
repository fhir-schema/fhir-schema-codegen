import fs from 'node:fs';
import path from 'node:path';
import type { Command as Commander } from 'commander';
import { GeneratorError, generatorsRegistry } from '../generators-registry';
import { logger } from '../logger';
import { BaseCommand } from './command';

/**
 * Command to create a new custom generator template
 */
export class CreateGeneratorCommand extends BaseCommand {
    /**
     * Register the command with the commander instance
     * @param program - The commander program instance
     */
    register(program: Commander): void {
        program
            .command('create-generator')
            .description('Create a new custom generator template')
            .requiredOption('-n, --name <name>', 'Name of the new generator')
            .option('-o, --output <directory>', 'Output directory', './fhirschema-generators')
            .action(async (options) => {
                try {
                    const name = options.name;
                    const outputDir = path.resolve(process.cwd(), options.output, name);

                    // Initialize the registry to check for name conflicts
                    await generatorsRegistry.initialize();

                    // Validate the generator name
                    const validation = generatorsRegistry.validateGeneratorName(name);
                    if (!validation.isValid) {
                        logger.error(validation.error || 'Invalid generator name');
                        if (generatorsRegistry.isBuiltInGeneratorName(name)) {
                            logger.warn('Choose a different name for your custom generator.');
                            const builtInGenerators = generatorsRegistry
                                .getAll()
                                .filter((g) => g.isBuiltIn)
                                .map((g) => g.name);
                            logger.warn(`Built-in generators: ${builtInGenerators.join(', ')}`);
                        }
                        process.exit(1);
                    }

                    // Check if the directory already exists
                    if (fs.existsSync(outputDir)) {
                        logger.error(`Directory already exists: ${outputDir}`);
                        process.exit(1);
                    }

                    // Create directory structure
                    fs.mkdirSync(outputDir, { recursive: true });
                    fs.mkdirSync(path.join(outputDir, 'src'));

                    // Create package.json
                    const packageJson = {
                        name: `fhirschema-generator-${name}`,
                        version: '0.1.0',
                        description: `FHIR Schema code generator for ${name}`,
                        displayName: name.charAt(0).toUpperCase() + name.slice(1),
                        main: 'dist/index.js',
                        keywords: ['fhirschema-generator'],
                        scripts: {
                            build: 'tsc',
                            test: 'echo "Error: no test specified" && exit 1',
                        },
                        author: '',
                        license: 'ISC',
                        devDependencies: {
                            typescript: '^5.6.3',
                        },
                        dependencies: {
                            '@fhirschema/codegen': '^0.0.4',
                        },
                    };

                    fs.writeFileSync(
                        path.join(outputDir, 'package.json'),
                        JSON.stringify(packageJson, null, 2),
                    );

                    // Create tsconfig.json
                    const tsConfig = {
                        compilerOptions: {
                            target: 'es2020',
                            module: 'commonjs',
                            outDir: './dist',
                            esModuleInterop: true,
                            strict: true,
                            declaration: true,
                        },
                        include: ['src/**/*.ts'],
                        exclude: ['node_modules'],
                    };

                    fs.writeFileSync(
                        path.join(outputDir, 'tsconfig.json'),
                        JSON.stringify(tsConfig, null, 2),
                    );

                    // Create README.md
                    const readme = `# FHIR Schema Generator: ${name}

A custom FHIR Schema code generator for ${name}.

## Installation

\`\`\`bash
npm install
npm run build
\`\`\`

## Usage

\`\`\`bash
fscg generate -g ${name} -o ./output -f ./path-to-schema-files.ndjson --custom-generator-path ./fhirschema-generators
\`\`\`
`;

                    fs.writeFileSync(path.join(outputDir, 'README.md'), readme);

                    // Create generator template
                    const generatorTemplate = `import { Generator, GeneratorOptions } from '@fhirschema/codegen/dist/generator';
import { TypeSchema } from '@fhirschema/codegen/dist/typeschema';
import path from 'path';

export interface ${name.charAt(0).toUpperCase() + name.slice(1)}GeneratorOptions extends GeneratorOptions {
    // Add custom options here
}

export class ${name.charAt(0).toUpperCase() + name.slice(1)}Generator extends Generator {
    constructor(opts: ${name.charAt(0).toUpperCase() + name.slice(1)}GeneratorOptions) {
        super({
            ...opts,
            staticDir: path.resolve(__dirname, '../static'),
        });
    }

    generateType(schema: TypeSchema) {
        // Implement type generation logic
        this.line(\`// Generated type for \${schema.name.name}\`);
        // Add your implementation here
    }

    generate() {
        // Implement generation logic
        this.dir('src', async () => {
            this.file('types.txt', () => {
                this.line(\`// ${name.toUpperCase()} Generator\`);
                this.line(\`// Generated on \${new Date().toISOString()}\`);
                this.line('');
                
                for (const schema of this.loader.complexTypes()) {
                    this.generateType(schema);
                }
            });
        });
    }
}

export function createGenerator(options: GeneratorOptions): Generator {
    return new ${name.charAt(0).toUpperCase() + name.slice(1)}Generator(options);
}
`;

                    fs.writeFileSync(path.join(outputDir, 'src', 'index.ts'), generatorTemplate);

                    // Create static directory
                    fs.mkdirSync(path.join(outputDir, 'static'));

                    logger.success(`Custom generator template created at ${outputDir}`);
                    logger.info('');
                    logger.info('Next steps:');
                    logger.infoHighlight(`1. cd ${outputDir}`);
                    logger.infoHighlight('2. npm install');
                    logger.infoHighlight('3. npm run build');
                    logger.infoHighlight(
                        `4. Use your generator: fscg generate -g ${name} -o ./output -f ./schema.ndjson --custom-generator-path ${options.output}`,
                    );
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
