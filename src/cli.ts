#!/usr/bin/env node

import { Command } from 'commander';
import { CSharpGenerator } from './generators/csharp';
import { PythonGenerator } from './generators/python';
import { TypeScriptGenerator } from './generators/typescript';
import { SchemaLoader } from './loader';
import path from 'path';
import fs from 'fs';

const generators = {
  typescript: TypeScriptGenerator,
  csharp: CSharpGenerator,
  'python-fhir-py': PythonGenerator
}

const program = new Command();
program
  .name('fhirschema-codegen')
  .description('Generate code from FHIR Schema')
  .version('0.1.0');

program.command('help')
  .description('Display help information')
  .action(() => {
    program.help();
  });

program.command('packages')
  .description('Display help information')
  .argument('[criteria...]', 'Search criteria like hl7 fhir')
  .action(async (criteria) => {
    let loader = new SchemaLoader();
    await loader.packageLookup(criteria.join(' '));
  });

program.command('package-summary')
  .description('list all resources in a package')
  .requiredOption('-p, --package <package>', 'FHIR package name')
  .action(async (options) => {
    let loader = new SchemaLoader();
    await loader.packageSummary(options.package);
  });

program.command('generate')
  .description('Generate code from FHIR Schema')
  .requiredOption('-g, --generator <type>', 'Generator type (' + Object.keys(generators).join(', ') + ')')
  .requiredOption('-o, --output <file>', 'Output directory')
  .requiredOption('-p, --package <package>', 'FHIR package name')
  .option('-c, --generateClasses <boolean>', 'Generate classes instead of interfaces (typescript only)', 'false')
  .action(async (options) => {
    const outputDir = path.resolve(process.cwd(), options.output);
    
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    if (!(options.generator in generators)) {
      console.error(`Unknown generator: ${options.generator}`);
      process.exit(1);
    }

    const generator = new generators[options.generator as keyof typeof generators]({
      outputDir,
      loaderOptions: {
        packages: options.package.split(",").map((pkg: string) => pkg.trim()),
      },
      ...options
    });

    await generator.init()
    generator.generate();
  });

program.parse();
