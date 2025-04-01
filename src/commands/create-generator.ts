import type { Command as Commander } from 'commander';
import fs from 'node:fs';
import path from 'node:path';
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
            .requiredOption('-o, --output <directory>', 'Output directory')
            .action(async (options) => {
                try {
                    const version = await import('./../../package.json').then(
                        (m) => m.default.version,
                    );

                    const outputDir = path.resolve(process.cwd(), options.output);
                    await generatorsRegistry.initialize();

                    if (fs.existsSync(outputDir)) {
                        logger.error(`Directory already exists: ${outputDir}`);
                        process.exit(1);
                    }

                    fs.mkdirSync(outputDir, { recursive: true });
                    fs.mkdirSync(path.join(outputDir, 'src'));

                    const packageJsonPath = path.join(__dirname, 'static', 'package.json');
                    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

                    packageJson.dependencies = {
                        '@fhirschema/codegen': `^${version}`,
                    };

                    fs.writeFileSync(
                        path.join(outputDir, 'package.json'),
                        JSON.stringify(packageJson, null, 2),
                    );

                    fs.copyFileSync(
                        path.join(__dirname, 'static', 'tsconfig.json'),
                        path.join(outputDir, 'tsconfig.json'),
                    );

                    fs.copyFileSync(
                        path.join(__dirname, 'static', 'readme.md'),
                        path.join(outputDir, 'README.md'),
                    );

                    fs.copyFileSync(
                        path.join(__dirname, 'static', 'index.ts'),
                        path.join(outputDir, 'src', 'index.ts'),
                    );

                    logger.success(`Custom generator template created at ${outputDir}`);
                    logger.info('');
                    logger.info('Next steps:');
                    logger.infoHighlight(`1. cd ${outputDir}`);
                    logger.infoHighlight('2. npm install');
                    logger.infoHighlight('3. npm run build');
                    logger.infoHighlight(
                        `4. Use your generator: fscg generate -o ./output -f ./<type-schema>.ndjson --custom-generator ${options.output}`,
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
