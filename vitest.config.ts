import { defineConfig } from 'vitest/config';

// biome-ignore lint/style/noDefaultExport: <explanation>
export default defineConfig({
    test: {
        include: ['**/*.test.ts'],
        globals: true,
        coverage: {
            reporter: ['cobertura', 'text', 'html'],
            exclude: [
                '**/build/**',
                '**/.{idea,git,cache,output,temp}/**',
            ],
        },
        exclude: [
            '**/node_modules/**',
            '**/build/**',
            '**/.{idea,git,cache,output,temp}/**',
            '**/example/**'
        ],

    },

});
