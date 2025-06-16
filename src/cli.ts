#!/usr/bin/env node
import { Command } from 'commander';
import packageJson from '../package.json';
import {
    CreateGeneratorCommand,
    GenerateCommand,
    GeneratorsListCommand,
    HelpCommand,
    InstallTypeSchemaCommand,
} from './commands';
import { generatorsRegistry } from './generators-registry';
import { LogLevel, logger } from './logger';

// Create the commander program
const program = new Command();
program
    .name('fhirschema-codegen')
    .description('Generate code from FHIR Schema')
    .version(packageJson.version);

// Add global options
program
    .option('--debug', 'Enable debug output (synonym for --verbose)')
    .option('--verbose', 'Enable verbose output')
    .option('--quiet', 'Suppress all output except errors')
    .hook('preAction', (thisCommand) => {
        const options = thisCommand.opts();
        if (options.debug || options.verbose) {
            logger.setLevel(LogLevel.DEBUG);
        } else if (options.quiet) {
            logger.setLevel(LogLevel.ERROR);
        }
    });

// Register commands
const commands = [
    new HelpCommand(),
    new GeneratorsListCommand(),
    new GenerateCommand(),
    new CreateGeneratorCommand(),
    new InstallTypeSchemaCommand(),
];

// Register each command with the program
commands.forEach((command) => command.register(program));

// Main execution
(async () => {
    try {
        // Initialize the registry before parsing
        await generatorsRegistry.initialize();
        program.parse(process.argv);
    } catch (error) {
        handleError(error);
    }
})();

/**
 * Handles errors in a consistent way
 * @param error - Error object
 */
function handleError(error) {
    logger.error(`Error: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
}
