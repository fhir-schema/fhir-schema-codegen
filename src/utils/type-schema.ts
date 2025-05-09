import { exec } from 'node:child_process';
import fs, { existsSync } from 'node:fs';
import { mkdir } from 'node:fs';
import { arch, platform } from 'node:os';
import { logger } from '../logger';
import { join } from 'node:path';
import { promisify } from 'node:util';
import { spawn } from 'node:child_process';

const execAsync = promisify(exec);

export const TYPE_SCHEMA_VERSION = '0.0.9';
const BIN_DIR = 'tmp/bin';

interface BinaryInfo {
    url: string;
    name: string;
}

function getBinaries(version: string): Record<string, BinaryInfo> {
    return {
        'darwin-arm64': {
            url: `https://github.com/fhir-clj/type-schema/releases/download/v${version}/type-schema-macos-arm64`,
            name: 'type-schema',
        },
        'darwin-x64': {
            url: `https://github.com/fhir-clj/type-schema/releases/download/v${version}/type-schema-macos`,
            name: 'type-schema',
        },
        'linux-arm64': {
            url: `https://github.com/fhir-clj/type-schema/releases/download/v${version}/type-schema-linux-arm64`,
            name: 'type-schema',
        },
        'linux-x64': {
            url: `https://github.com/fhir-clj/type-schema/releases/download/v${version}/type-schema-linux`,
            name: 'type-schema',
        },
        win32: {
            url: `https://github.com/fhir-clj/type-schema/releases/download/v${version}/type-schema-windows.exe`,
            name: 'type-schema.exe',
        },
    };
}

async function downloadBinary(url: string, destination: string): Promise<void> {
    try {
        logger.info(`Downloading from ${url} to ${destination}...`);
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to download: ${response.statusText}`);
        }

        const buffer = await response.arrayBuffer();
        await fs.promises.writeFile(destination, Buffer.from(buffer));

        logger.success('The type-schema binary was downloaded successfully');
    } catch (error) {
        logger.error(`Download failed: ${error instanceof Error ? error.message : String(error)}`);
        throw error;
    }
}

export async function executeTypeSchema(
    packages: string[],
    version: string = TYPE_SCHEMA_VERSION,
    customExecCommand?: string,
): Promise<string> {
    const binaryPath = customExecCommand || (await ensureBinaryExists(version));

    const typeSchemaVersion = await getTypeSchemaVersion(binaryPath);
    logger.info(`Use type-schema version ${typeSchemaVersion}`);

    if (!customExecCommand && typeSchemaVersion !== version && typeSchemaVersion !== 'unknown') {
        logger.warn(
            `TypeSchema version is not recommended. Expected ${version}, got ${typeSchemaVersion}. \n\nUse \`fscg install-type-schema\` to install recommended version.`,
        );
    }

    const outputPath = './tmp';
    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
    }
    const outputFile = `${outputPath}/type-schema.ndjson`;
    const cmd = binaryPath.split(' ').concat(packages).concat(["--output", outputFile]);
    logger.debug(`Exec: ${cmd.join(' ')}`);

    const process = spawn(cmd[0], cmd.slice(1), {
        stdio: 'pipe',
        shell: false,
    });
    let stdout = '';
    let stderr = '';

    process.stdout.on('data', (data) => {
        stdout += data.toString();
    });

    process.stderr.on('data', (data) => {
        stderr += data.toString();
    });

    return new Promise((resolve, reject) => {
        process.on('close', (code) => {
            if (code === 0) {
                fs.promises
                    .readFile(outputFile, 'utf8')
                    .then((fileContent) => {
                        resolve(fileContent);
                    })
                    .catch((err) => {
                        reject(new Error(`Failed to read temporary output file: ${err.message}`));
                    });
            } else {
                reject(
                    new Error(
                        `Process exited with code ${code}
${stderr}`,
                    ),
                );
            }
        });

        process.on('error', (error) => {
            reject(error);
        });
    });
}

export async function getTypeSchemaVersion(binaryPath): Promise<string> {
    try {
        const { stdout, stderr } = await execAsync(`${binaryPath} --version`);
        if (stderr) {
            logger.warn(`Warning while getting type-schema version: ${stderr}`);
        }
        return stdout.split(' ')[2].trim();
    } catch (error) {
        logger.error(
            `Failed to get type-schema version: ${error instanceof Error ? error.message : String(error)}`,
        );
        throw error;
    }
}

export async function ensureBinaryExists(version: string, force = false): Promise<string> {
    const os = platform();
    const architecture = arch();
    const platformKey = `${os}-${architecture}`;

    const binaryInfo = getBinaries(version)[platformKey];
    if (!binaryInfo) {
        throw new Error(`Unsupported platform: ${platformKey}`);
    }

    const binaryPath = join(BIN_DIR, binaryInfo.name);

    if (!existsSync(binaryPath) || force) {
        if (!existsSync(BIN_DIR)) {
            await promisify(mkdir)(BIN_DIR, { recursive: true });
        }
        logger.info(`Downloading the type-schema binary for ${platformKey}...`);
        await downloadBinary(binaryInfo.url, binaryPath);
    }

    if (os !== 'win32') {
        await execAsync(`chmod +x ${binaryPath}`);
    }

    return binaryPath;
}
