import { exec } from 'node:child_process';
import fs, { existsSync } from 'node:fs';
import { mkdir } from 'fs';
import { arch, platform } from 'os';
import { join } from 'path';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface BinaryInfo {
    url: string;
    name: string;
}

const TYPE_SCHEMA_VERSION = '0.0.5';

const BINARIES: Record<string, BinaryInfo> = {
    'darwin-arm64': {
        url: `https://github.com/fhir-clj/type-schema/releases/download/v${TYPE_SCHEMA_VERSION}/type-schema-macos-arm64`,
        name: 'type-schema',
    },
    'darwin-x64': {
        url: `https://github.com/fhir-clj/type-schema/releases/download/v${TYPE_SCHEMA_VERSION}/type-schema-macos`,
        name: 'type-schema',
    },
    'linux-arm64': {
        url: `https://github.com/fhir-clj/type-schema/releases/download/v${TYPE_SCHEMA_VERSION}/type-schema-linux-arm64`,
        name: 'type-schema',
    },
    'linux-x64': {
        url: `https://github.com/fhir-clj/type-schema/releases/download/v${TYPE_SCHEMA_VERSION}/type-schema-linux`,
        name: 'type-schema',
    },
    win32: {
        url: `https://github.com/fhir-clj/type-schema/releases/download/v${TYPE_SCHEMA_VERSION}/type-schema-windows.exe`,
        name: 'type-schema.exe',
    },
};

/**
 * Downloads a binary file from a URL to a specified destination
 * @param url - URL to download from
 * @param destination - Local path to save the binary
 */
async function downloadBinary(url: string, destination: string): Promise<void> {
    try {
        console.log(`Downloading from ${url} to ${destination}...`);
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to download: ${response.statusText}`);
        }

        const buffer = await response.arrayBuffer();
        await fs.promises.writeFile(destination, Buffer.from(buffer));

        console.log('The type-schema binary was downloaded successfully');
    } catch (error) {
        console.error('Download failed:', error);
        throw error;
    }
}

/**
 * Checks if a file is executable
 * @param filePath - Path to the file to check
 * @returns boolean indicating if the file is executable
 */
function isExecutable(filePath: string): boolean {
    try {
        fs.accessSync(filePath, fs.constants.X_OK);
        return true;
    } catch {
        return false;
    }
}

/**
 * Ensures the type-schema binary exists and is executable
 * Downloads the binary if it doesn't exist
 * @returns path to the binary
 */
export async function ensureBinaryExists(): Promise<string> {
    const os = platform();
    const architecture = arch();
    const platformKey = `${os}-${architecture}`;

    const binaryInfo = BINARIES[platformKey];

    if (!binaryInfo) {
        throw new Error(`Unsupported platform: ${platformKey}`);
    }

    const binDir = join(__dirname, '..', '..', '..', 'bin');
    const binaryPath = join(binDir, binaryInfo.name);

    if (!existsSync(binDir)) {
        await promisify(mkdir)(binDir, { recursive: true });
    }

    if (!existsSync(binaryPath)) {
        console.log(`Downloading the type-schema binary for ${platformKey}...`);
        await downloadBinary(binaryInfo.url, binaryPath);

        if (os !== 'win32') {
            await execAsync(`chmod +x ${binaryPath}`);
        }
    }

    if (os !== 'win32' && !isExecutable(binaryPath)) {
        await execAsync(`chmod +x ${binaryPath}`);
    }

    return binaryPath;
}