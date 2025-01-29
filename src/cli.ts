#!/usr/bin/env node
import path from 'path';
import fs from 'fs';
import { Command } from 'commander';
import { SchemaLoader } from './loader';


const program = new Command();
program.name('fhirschema-codegen').description('Generate code from FHIR Schema').version('0.1.0');

program
  .command('help')
  .description('Display help information')
  .action(() => {
    program.help();
  });

program
  .command('packages')
  .description('Display help information')
  .argument('[criteria...]', 'Search criteria like hl7 fhir')
  .action(async (criteria) => {
    let loader = new SchemaLoader();
    await loader.packageLookup(criteria.join(' '));
  });

program
  .command('package-summary')
  .description('list all resources in a package')
  .requiredOption('-p, --package <package>', 'FHIR package name')
  .action(async (options) => {
    let loader = new SchemaLoader();
    await loader.packageSummary(options.package);
  });

program
  .command('generate')
  .description('Generate code from FHIR Schema')
  .requiredOption('-g, --generator <type>', 'Generator package')
  .requiredOption('-o, --output <file>', 'Output directory')
  .requiredOption('-p, --package <package>', 'FHIR package name')
  .option('-c, --generateClasses <boolean>', 'Generate classes instead of interfaces (typescript only)', 'false')
  .action(async (options) => {
    const outputDir = path.resolve(process.cwd(), options.output);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    let createGenerator;
    try {
      const generatorPlugin = await import(options.generator);
      createGenerator = generatorPlugin.createGenerator
    } catch (error) {
      console.error(`Cannot find generator plugin: ${options.generator}`);  
      process.exit(1);
    }

    const generator = createGenerator({
      outputDir,
      loaderOptions: {
        packages: options.package.split(',').map((pkg: string) => pkg.trim()),
      },
      ...options,
    });

    await generator.init();
    generator.generate();

  });

program.parse();
