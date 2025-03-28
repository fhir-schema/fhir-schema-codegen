#!/usr/bin/env node
import path from 'path';
import fs from 'fs';
import { Command, Option } from 'commander';
import * as process from 'node:process';

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
    .addOption(new Option('-g, --generator <name>').choices(['typescript', 'csharp', 'python']).makeOptionMandatory(true))
    .requiredOption('-o, --output <file>', 'Output directory')
    .requiredOption('-f, --files <files...>', 'TypeSchema source *.ngjson files')
    .action(async (options: { files: string[]; generator: string; output: string }) => {
        const outputDir = path.resolve(process.cwd(), options.output);

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        let createGenerator;

        try {
            const generatorPath = path.resolve(__dirname, 'generators', options.generator, 'index.js');
            const generatorPlugin = await import(generatorPath);
            if (!generatorPlugin.createGenerator) {
                console.error(`Generator plugin ${options.generator} does not export createGenerator function`);
                process.exit(1);
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
