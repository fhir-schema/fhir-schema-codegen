#!/usr/bin/env node
import fs, { existsSync } from 'node:fs';
import path from 'node:path';
import * as process from 'node:process';
import { Command, Option } from 'commander';
import pc from 'picocolors'

const program = new Command();
program.name('fhirschema-codegen').description('Generate code from FHIR Schema').version('0.1.0');

program
  .command('help')
  .description('Display help information')
  .action(() => {
    program.help();
  });

program
  .command('generate')
  .description('Generate code from FHIR Schema')
  .addOption(
    new Option('-g, --generator <name>')
      .choices(['typescript', 'csharp', 'python'])
      .makeOptionMandatory(true),
  )
  .requiredOption('-o, --output <file>', 'Output directory')
  .requiredOption('-f, --files <files...>', 'TypeSchema source *.ngjson files')
  .hook('preAction', (args) => {
    const files = args.opts().files;
    for (const file of files) {
      const filePath = path.resolve(file);
      if (!existsSync(filePath)) {
        console.error(pc.red(`Input file by path doesn't exist - '${filePath}'`));
        console.error(pc.red('Exit...'));
        process.exit(1);
      }
    }
  })
  .action(async (options: { files: string[]; generator: string; output: string }) => {
    const outputDir = path.resolve(process.cwd(), options.output);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
    let createGenerator;

    try {
      const generatorPath = path.resolve(__dirname, 'generators', options.generator, 'index.js');
      const generatorPlugin = await import(generatorPath);
      if (!generatorPlugin.createGenerator) {
        console.error(pc.red(
          `Generator plugin ${options.generator} does not export createGenerator function`,
        ));
        process.exit(1);
      }
      createGenerator = generatorPlugin.createGenerator;
    } catch (error) {
      console.error(pc.red(`Error loading generator plugin: ${options.generator}`), error);
      process.exit(1);
    }

    const generator = createGenerator({ outputDir, ...options });
    console.info(pc.bgCyan(`Start generate for ${options.generator}...`))
    console.info();
    await generator.init();
    generator.generate();
    console.info(pc.bgGreen(`Successfully generated to  ${options.output}...`))

  });

program.parse();
