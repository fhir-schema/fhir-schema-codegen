#!/usr/bin/env node
import { Command } from 'commander';
import {
    CreateGeneratorCommand,
    GenerateCommand,
    GeneratorsListCommand,
    HelpCommand,
} from './commands';
import { generatorsRegistry } from './generators-registry';
import { LogLevel, logger } from './logger';

// Create the commander program
const program = new Command();
program.name('fhirschema-codegen').description('Generate code from FHIR Schema').version('0.1.0');

// Add global options
program
  .option('--debug', 'Enable debug output')
  .option('--quiet', 'Suppress all output except errors')
  .hook('preAction', (thisCommand: Command) => {
    const options = thisCommand.opts();
    if (options.debug) {
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
function handleError(error: unknown): never {
  logger.error(
    `Error: ${error instanceof Error ? error.message : String(error)}`,
  );
  process.exit(1);
}
