#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { Command, Option } from "commander";
import { TypeScriptGenerator } from "./generators/typescript";

const generators = {
  typescript: TypeScriptGenerator,
};

const program = new Command();

program
  .name("fhirschema-codegen")
  .description("Generate code from FHIR Schema")
  .version("0.1.0");

program
  .command("help")
  .description("Display help information")
  .action(() => {
    program.help();
  });

program
  .command("generate")
  .description("Generate code from FHIR Schema")
  .addOption(
    new Option("-g, --generator <generator>", "Generator target")
      .choices(["typescript"])
      .makeOptionMandatory(true),
  )
  .requiredOption("--output <output>", "Output directory")
  .requiredOption("--package <package>", "FHIR package name")
  .addOption(
    new Option(
      "--generateClasses",
      "Generate classes instead of interfaces (typescript only)",
    ).implies({
      generator: "typescript",
    }),
  )
  .on("option:generateClasses", () => {
    program.error(
      "You can use 'generateClasses' option only with --generator typescript",
    );
  })
  .action(async (options) => {
    const outputDir = path.resolve(process.cwd(), options.output);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    if (options.generator === "typescript") {

      const generator = new generators.typescript({
        outputDir,
        generateClasses: options.generateClasses,
      });

      // TODO: load package before start generating
      // generator.loader.loadNDJSONContent(
      //   fs.readFileSync("./data/hl7.fhir.r4.core.ndjson", "utf-8"),
      // );
      generator.generate();


    }
  });

program.parse();
