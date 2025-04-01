import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const __dirname = dirname(fileURLToPath(import.meta.url));

// biome-ignore lint/style/noDefaultExport: <explanation>
export default defineConfig({
    plugins: [tsconfigPaths()],
    build: {
        target: 'node20',
        emptyOutDir: false, // Don't empty the dir since the library build already produced files
        lib: {
            entry: resolve(__dirname, 'src/cli.ts'),
            name: 'fscg',
            formats: ['es'],
            fileName: () => 'cli.js',
        },
        rollupOptions: {
            external: [/^node:.*/],
        },
    },
});
