const fs = require('fs');
const readline = require('readline');
const path = require('path');
const { Logger, LogLevel } = require('../src/logger');

// Create a logger instance
const logger = new Logger(LogLevel.INFO);
const inputFile = './data/hl7.fhir.r4.core.ndjson';
const outputDir = './tmp/schemas';

// Create output directory if it doesn't exist
fs.rmSync(outputDir, { recursive: true, force: true });

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const fileStream = fs.createReadStream(inputFile);
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

for await (const line of rl) {
    try {
        const schema = JSON.parse(line);
        if(schema.url && schema.resourceType === undefined && schema.type !== "Extension") {
            let name =  schema.url.split('/').pop();
            const foutputDir = path.join(outputDir, schema.kind, schema.derivation);
            if (!fs.existsSync(foutputDir)) {
                fs.mkdirSync(foutputDir, { recursive: true });
            }
            const outputFile = path.join(foutputDir, `${name}.json`);
            logger.info(
                `${name} ${schema.kind} ${schema.resourceType} ${outputFile}`
            );
            fs.writeFileSync(
                outputFile,
                JSON.stringify(schema, null, 4) + '\n'
            );
        }
    } catch (err) {
        logger.error(`Error processing line: ${err instanceof Error ? err.message : String(err)}`);
    }
}