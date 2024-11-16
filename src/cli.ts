#!/usr/bin/env node

import { Command } from 'commander';
import { TypeScriptGenerator } from './generators/typescript';
import { SchemaLoader } from './loader';
import path from 'path';
import fs from 'fs';


const generators = {
  typescript: TypeScriptGenerator
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

program.command('generate')
  .description('Generate code from FHIR Schema')
  .requiredOption('-g, --generator <type>', 'Generator type (' + Object.keys(generators).join(', ') + ')')
  .requiredOption('-o, --output <file>', 'Output directory')
  .requiredOption('-p, --package <package>', 'FHIR package name')
  .option('-c, --generateClasses <boolean>', 'Generate classes instead of interfaces (typescript only)', 'false')
  .action(async (options) => {
    console.log(options);
    const outputDir = path.resolve(process.cwd(), options.output);
    
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    switch (options.generator) {
          case 'typescript':
              const generator = new generators.typescript({
                  outputDir,
                  loaderOptions: {
                    packages: options.package.split(',').map((pkg: string) => pkg.trim())
                  },
                  generateClasses: options.generateClasses
              });
              await generator.init();
              await generator.generate();
              break;
          default:
              console.error(`Unknown generator: ${options.generator}`);
              process.exit(1);
      }
  });

program.parse();
