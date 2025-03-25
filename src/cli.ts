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
    .action(async (criteria: string[]) => {
        let loader = new SchemaLoader();
        await loader.packageLookup(criteria.join(' '));
    });

program
    .command('package-summary')
    .description('list all resources in a package')
    .requiredOption('-p, --package <package>', 'FHIR package name')
    .action(async (options: { package: string }) => {
        let loader = new SchemaLoader();
        await loader.packageSummary(options.package);
    });

program
    .command('generate')
    .description('Generate code from FHIR Schema')
    .requiredOption('-g, --generator <type>', 'Generator package')
    .requiredOption('-o, --output <file>', 'Output directory')
    .option('-c, --generateClasses <boolean>', 'Generate classes instead of interfaces (typescript only)', 'false')
    .action(async (options: { generator: string; output: string; package: string; generateClasses: boolean }) => {
        const outputDir = path.resolve(process.cwd(), options.output);

        console.log(outputDir);

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        let createGenerator;

        console.log(options.generator);

        try {
            const generatorPath = path.resolve(__dirname, options.generator + '.js');
            const generatorPlugin = await import(generatorPath);
            if (!generatorPlugin.createGenerator) {
                throw new Error(`Generator plugin ${options.generator} does not export createGenerator function`);
            }
            createGenerator = generatorPlugin.createGenerator;
        } catch (error) {
            console.error(`Error loading generator plugin: ${options.generator}`, error);
            process.exit(1);
        }

        const generator = createGenerator({ outputDir, ...options });

        await generator.init();
        generator.generate();
    });

program.parse();
