import { Command as Commander, Argument } from 'commander';
import { ensureBinaryExists, TYPE_SCHEMA_VERSION } from '../utils/type-schema-utils';
import { BaseCommand } from './command';
import { logger } from '../logger';

export class InstallTypeSchemaCommand extends BaseCommand {
    register(program: Commander): void {
        program
            .command('install-type-schema')
            .description('Install the type-schema binary')
            .addArgument(
                new Argument('[version]', 'Specific version to install').default(
                    TYPE_SCHEMA_VERSION,
                    'default version',
                ),
            )
            .action(async (version: string) => {
                try {
                    logger.info(`Installing type-schema binary version ${version}...`);
                    const binaryPath = await ensureBinaryExists(version);
                    logger.info(`Type-schema binary installed successfully at: ${binaryPath}`);
                } catch (error) {
                    logger.error(
                        `Failed to install type-schema binary: ${error instanceof Error ? error.message : String(error)}`,
                    );
                    process.exit(1);
                }
            });
    }
}
