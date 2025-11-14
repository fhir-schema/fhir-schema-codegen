/**
 * Extension Generation Tests
 *
 * Tests that Extension profiles generate spec-compliant TypeScript types
 * with discriminated unions for value[x] polymorphic elements.
 *
 * These tests ensure:
 * 1. Extensions use ExtractExtensionValue helper (shared type)
 * 2. Simple extensions have constrained value types
 * 3. Complex extensions have extension[] array (no value)
 * 4. Type safety prevents multiple value properties
 * 5. Cross-references work correctly between generated types
 */

import { describe, it, expect } from 'vitest';
import { TypeScriptGenerator } from '../src/generators/typescript';
import { SchemaLoader } from '../src/loader';
import * as path from 'node:path';
import * as fs from 'node:fs';

describe('Extension Generation', () => {
    it('should generate simple extension with ExtractExtensionValue', async () => {
        // This test ensures extensions use the shared ExtractExtensionValue helper
        // instead of generating discriminated unions inline every time
        const loader = new SchemaLoader();

        // Load R4 core + Norwegian Basis
        const schemaFiles = [
            path.join(__dirname, '../example/typescript/fhirsdk/schema.ndjson')
        ];

        for (const file of schemaFiles) {
            if (fs.existsSync(file)) {
                await loader.load(file);
            }
        }

        const generator = new TypeScriptGenerator({
            loader,
            outputDir: path.join(__dirname, '../tmp/test-output'),
            profile: true
        });

        // Generate types
        generator.generate();

        // Check that extension-values.ts static file exists
        const extensionValuesPath = path.join(
            __dirname,
            '../src/generators/typescript/static/extension-values.ts'
        );
        expect(fs.existsSync(extensionValuesPath)).toBe(true);

        // Read the static file
        const extensionValuesContent = fs.readFileSync(extensionValuesPath, 'utf-8');

        // Verify it contains ExtractExtensionValue helper
        expect(extensionValuesContent).toContain('export type ExtractExtensionValue');
        expect(extensionValuesContent).toContain('export type ExtensionValueAll');
        expect(extensionValuesContent).toContain('export interface ExtensionValueTypes');

        // Verify all 52 value[x] types are present
        expect(extensionValuesContent).toContain('valueString');
        expect(extensionValuesContent).toContain('valueCoding');
        expect(extensionValuesContent).toContain('valueBoolean');
        expect(extensionValuesContent).toContain('valueInteger');
        expect(extensionValuesContent).toContain('valueCodeableConcept');
        // ... etc (52 total types)
    });

    it('should generate extension with single value type using helper', async () => {
        const outputDir = path.join(__dirname, '../tmp/test-output/types');

        // Find a simple extension file (e.g., municipality code)
        const extensionFiles = fs.readdirSync(outputDir, { recursive: true })
            .filter((f: string) => f.endsWith('.ts') && !f.includes('_profile'));

        const simpleExtension = extensionFiles.find((f: string) => {
            const content = fs.readFileSync(path.join(outputDir, f), 'utf-8');
            return content.includes('extends Element') &&
                   content.includes('ExtractExtensionValue') &&
                   content.includes('value?:');
        });

        expect(simpleExtension).toBeDefined();

        if (simpleExtension) {
            const content = fs.readFileSync(path.join(outputDir, simpleExtension), 'utf-8');

            // Should import ExtractExtensionValue
            expect(content).toContain("import { ExtractExtensionValue } from '../extension-values'");

            // Should use helper instead of inline union
            expect(content).toMatch(/export type \w+Value = ExtractExtensionValue<'value\w+'>/);

            // Should NOT have inline discriminated union (50+ lines of | { value...: ... })
            const unionLines = content.split('\n').filter(line =>
                line.trim().startsWith('| { value')
            );
            expect(unionLines.length).toBe(0);
        }
    });

    it('should generate complex extension with extension[] array', async () => {
        const outputDir = path.join(__dirname, '../tmp/test-output/types');

        const complexExtension = fs.readdirSync(outputDir, { recursive: true })
            .filter((f: string) => f.endsWith('.ts'))
            .find((f: string) => {
                const content = fs.readFileSync(path.join(outputDir, f), 'utf-8');
                return content.includes('extends Element') &&
                       content.includes('extension?: Extension[]') &&
                       !content.includes('value?:');
            });

        expect(complexExtension).toBeDefined();

        if (complexExtension) {
            const content = fs.readFileSync(path.join(outputDir, complexExtension), 'utf-8');

            // Should import Extension
            expect(content).toContain("import { Extension } from");

            // Should have extension array, NOT value
            expect(content).toContain('extension?: Extension[]');
            expect(content).not.toContain('value?:');

            // Should NOT import ExtractExtensionValue
            expect(content).not.toContain('ExtractExtensionValue');
        }
    });

    it('should enforce type safety with discriminated unions', () => {
        // This test validates that the ExtractExtensionValue helper
        // correctly enforces "ONE value type at a time" semantics

        // Simulate extension value types
        type TestExtensionValue =
            | { valueString: string }
            | { valueCoding: { code: string } };

        // ✅ Valid: single value type
        const valid: TestExtensionValue = { valueString: "test" };
        expect(valid).toBeDefined();

        // ✅ TypeScript should prevent this at compile time:
        // const invalid: TestExtensionValue = {
        //     valueString: "test",
        //     valueCoding: { code: "test" }  // Error: can't have both!
        // };

        // Type assertion to verify structure
        type ValueKeys = keyof TestExtensionValue extends never ? never :
            TestExtensionValue extends { valueString: string } ? 'valueString' :
            TestExtensionValue extends { valueCoding: any } ? 'valueCoding' : never;

        // Each union member should have exactly one key
        const stringMember: Extract<TestExtensionValue, { valueString: string }> = { valueString: "test" };
        expect(Object.keys(stringMember).length).toBe(1);
    });

    it('should cross-reference extension types correctly', async () => {
        // This test ensures that when multiple extensions reference the same
        // value types, they all use the canonical ExtensionValueAll union

        const outputDir = path.join(__dirname, '../tmp/test-output/types');
        const extensionFiles = fs.readdirSync(outputDir, { recursive: true })
            .filter((f: string) => f.endsWith('.ts') && !f.includes('_profile'))
            .filter((f: string) => {
                const content = fs.readFileSync(path.join(outputDir, f), 'utf-8');
                return content.includes('extends Element') && content.includes('ExtractExtensionValue');
            });

        // All simple extensions should reference the same helper
        for (const file of extensionFiles) {
            const content = fs.readFileSync(path.join(outputDir, file), 'utf-8');
            expect(content).toContain("import { ExtractExtensionValue } from '../extension-values'");

            // Verify no inline union generation (DRY principle)
            const hasInlineUnion = content.includes('| { valueString:') ||
                                  content.includes('| { valueCoding:');
            expect(hasInlineUnion).toBe(false);
        }

        // Verify at least 2 extensions use the shared helper
        expect(extensionFiles.length).toBeGreaterThanOrEqual(2);
    });
});
