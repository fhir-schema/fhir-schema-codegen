import { copyFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';

const __dirname = dirname(fileURLToPath(import.meta.url));

// biome-ignore lint/style/noDefaultExport: <explanation>
export default defineConfig({
    plugins: [
        tsconfigPaths(),
        dts({
            rollupTypes: true,
            tsconfigPath: resolve(__dirname, 'tsconfig.json'),
            afterBuild: () => {
                copyFileSync('dist/index.d.ts', 'dist/index.d.cts');
            },
        }),
    ],
    build: {
        target: 'node20',
        emptyOutDir: true,
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'fhirschema-codegen',
            formats: ['cjs', 'es'],
        },
        rollupOptions: {
            // Exclude Node.js built-in modules from the bundle
            external: [/^node:.*/],
        },
    },
});
