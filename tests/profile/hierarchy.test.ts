import { TypeSchema } from '../../src/typeschema';
import { hierarchy } from '../../src/profile';
import { MockSchemaLoader } from '../mocks/schema-loader';

describe('hierarchy', () => {
    let loader: MockSchemaLoader;

    beforeEach(() => {
        loader = new MockSchemaLoader();
    });

    it('should return a single element hierarchy for a constraint resource', () => {
        const aSchema = new TypeSchema({
            identifier: {
                name: 'A',
                package: 'test',
                kind: 'resource',
                version: '1.0.0',
                url: 'http://example.org/StructureDefinition/A',
            },
        });

        const bSchema = new TypeSchema({
            identifier: {
                name: 'B',
                package: 'test',
                kind: 'constraint',
                version: '1.0.0',
                url: 'http://example.org/StructureDefinition/B',
            },
            base: aSchema.identifier,
        });

        loader.addSchema(aSchema);
        loader.addSchema(bSchema);

        const result = hierarchy(loader, bSchema);

        expect(result).toEqual([bSchema, aSchema]);
    });

    it('should return single item for types without base', () => {
        const aSchema = new TypeSchema({
            identifier: {
                name: 'A',
                package: 'test',
                kind: 'resource',
                version: '1.0.0',
                url: 'http://example.org/StructureDefinition/A',
            },
        });

        loader.addSchema(aSchema);
        const result = hierarchy(loader, aSchema);

        expect(result).toEqual([aSchema]);
    });

    it('should handle a schema without a base reference', () => {
        const bSchema = new TypeSchema({
            identifier: {
                name: 'B',
                package: 'test',
                kind: 'constraint',
                version: '1.0.0',
                url: 'http://example.org/StructureDefinition/B',
            },
            // No base provided
        });

        loader.addSchema(bSchema);
        const result = hierarchy(loader, bSchema);

        expect(result).toEqual([bSchema]);
    });

    it('should handle multi-level constraint hierarchy', () => {
        const aSchema = new TypeSchema({
            identifier: {
                name: 'A',
                package: 'test',
                kind: 'resource',
                version: '1.0.0',
                url: 'http://example.org/StructureDefinition/A',
            },
        });

        const bSchema = new TypeSchema({
            identifier: {
                name: 'B',
                package: 'test',
                kind: 'constraint',
                version: '1.0.0',
                url: 'http://example.org/StructureDefinition/B',
            },
            base: aSchema.identifier,
        });

        const cSchema = new TypeSchema({
            identifier: {
                name: 'C',
                package: 'test',
                kind: 'constraint',
                version: '1.0.0',
                url: 'http://example.org/StructureDefinition/C',
            },
            base: bSchema.identifier,
        });

        loader.addSchema(aSchema);
        loader.addSchema(bSchema);
        loader.addSchema(cSchema);

        const result = hierarchy(loader, cSchema);

        expect(result).toEqual([cSchema, bSchema, aSchema]);
    });

    it('should throw an error when base type cannot be resolved', () => {
        const bSchema = new TypeSchema({
            identifier: {
                name: 'B',
                package: 'test',
                kind: 'constraint',
                version: '1.0.0',
                url: 'http://example.org/StructureDefinition/B',
            },
            base: {
                name: 'A',
                package: 'test',
                kind: 'resource',
                version: '1.0.0',
                url: 'http://example.org/StructureDefinition/A',
            },
        });

        loader.addSchema(bSchema);

        expect(() => hierarchy(loader, bSchema)).toThrow(
            'Failed to resolve base type: A in package test',
        );
    });

    it('should handle packages with different casing', () => {
        const aSchema = new TypeSchema({
            identifier: {
                name: 'A',
                package: 'test',
                kind: 'resource',
                version: '1.0.0',
                url: 'http://example.org/StructureDefinition/A',
            },
        });

        const bSchema = new TypeSchema({
            identifier: {
                name: 'B',
                package: 'TEST',
                kind: 'constraint',
                version: '1.0.0',
                url: 'http://example.org/StructureDefinition/B',
            },
            base: aSchema.identifier,
        });

        loader.addSchema(aSchema);
        loader.addSchema(bSchema);

        const result = hierarchy(loader, bSchema);

        expect(result).toEqual([bSchema, aSchema]);
    });
});
