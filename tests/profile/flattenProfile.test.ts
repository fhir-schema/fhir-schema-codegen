import { TypeSchema } from '../../src/typeschema';
import { flatProfile } from '../../src/profile';
import { MockSchemaLoader } from '../mocks/schema-loader';
import { stringType, numberType, booleanType } from '../mocks/primitive-types';

describe('flattenProfile', () => {
    let loader: MockSchemaLoader;

    beforeEach(() => {
        loader = new MockSchemaLoader();
    });

    it('should flatten a profile with a single constraint', () => {
        const baseSchema = new TypeSchema({
            identifier: {
                name: 'Base',
                package: 'test',
                kind: 'resource',
                version: '1.0.0',
                url: 'http://example.org/StructureDefinition/Base',
            },
            fields: {
                baseField: { type: stringType, required: false, array: false },
                constraintField: { type: numberType, required: false, array: false },
            },
        });

        const constraintSchema = new TypeSchema({
            identifier: {
                name: 'Constraint',
                package: 'test',
                kind: 'constraint',
                version: '1.0.0',
                url: 'http://example.org/StructureDefinition/Constraint',
            },
            base: baseSchema.identifier,
            fields: {
                constraintField: { type: numberType, required: false, array: false, min: 1 },
            },
        });

        loader.addSchema(baseSchema);
        loader.addSchema(constraintSchema);

        const result = flatProfile(loader, constraintSchema);

        expect(result.identifier).toEqual(constraintSchema.identifier);
        expect(result.base).toEqual(baseSchema.identifier);

        expect(result.fields).toBeDefined();
        expect(result.fields?.constraintField).toBeDefined();
        expect(result.fields?.constraintField.type).toEqual(numberType);
        expect(result.fields?.constraintField.required).toBe(false);
        expect(result.fields?.constraintField.array).toBe(false);
        expect(result.fields?.constraintField.min).toBe(1);
    });

    it('should merge fields from multiple constraints', () => {
        const baseSchema = new TypeSchema({
            identifier: {
                name: 'Base',
                package: 'test',
                kind: 'resource',
                version: '1.0.0',
                url: 'http://example.org/StructureDefinition/Base',
            },
            fields: {
                baseField: {
                    type: stringType,
                    required: false,
                    array: false,
                },
            },
        });

        const constraintSchemaA = new TypeSchema({
            identifier: {
                name: 'ConstraintA',
                package: 'test',
                kind: 'constraint',
                version: '1.0.0',
                url: 'http://example.org/StructureDefinition/ConstraintA',
            },
            base: baseSchema.identifier,
            fields: {
                fieldA: {
                    type: numberType,
                    required: false,
                    array: false,
                },
            },
        });

        const constraintSchemaB = new TypeSchema({
            identifier: {
                name: 'ConstraintB',
                package: 'test',
                kind: 'constraint',
                version: '1.0.0',
                url: 'http://example.org/StructureDefinition/ConstraintB',
            },
            base: constraintSchemaA.identifier,
            fields: {
                fieldB: {
                    type: booleanType,
                    required: false,
                    array: false,
                },
            },
        });

        loader.addSchema(baseSchema);
        loader.addSchema(constraintSchemaA);
        loader.addSchema(constraintSchemaB);

        const result = flatProfile(loader, constraintSchemaB);

        expect(result.identifier).toEqual(constraintSchemaB.identifier);
        expect(result.base).toEqual(baseSchema.identifier);

        // Check specific properties rather than exact equality
        expect(result.fields).toBeDefined();
        expect(result.fields?.fieldA).toBeDefined();
        expect(result.fields?.fieldB).toBeDefined();
        expect(result.fields?.fieldA.type).toEqual(numberType);
        expect(result.fields?.fieldB.type).toEqual(booleanType);
    });

    it('should override fields when merged', () => {
        const baseSchema = new TypeSchema({
            identifier: {
                name: 'Base',
                package: 'test',
                kind: 'resource',
                version: '1.0.0',
                url: 'http://example.org/StructureDefinition/Base',
            },
            fields: {
                common: {
                    type: stringType,
                    required: false,
                    array: false,
                },
            },
        });

        const constraintSchemaA = new TypeSchema({
            identifier: {
                name: 'ConstraintA',
                package: 'test',
                kind: 'constraint',
                version: '1.0.0',
                url: 'http://example.org/StructureDefinition/ConstraintA',
            },
            base: baseSchema.identifier,
            fields: {
                common: {
                    type: numberType,
                    required: false,
                    array: false,
                },
            },
        });

        const constraintSchemaB = new TypeSchema({
            identifier: {
                name: 'ConstraintB',
                package: 'test',
                kind: 'constraint',
                version: '1.0.0',
                url: 'http://example.org/StructureDefinition/ConstraintB',
            },
            base: constraintSchemaA.identifier,
            fields: {
                common: {
                    type: booleanType,
                    required: false,
                    array: false,
                },
            },
        });

        loader.addSchema(baseSchema);
        loader.addSchema(constraintSchemaA);
        loader.addSchema(constraintSchemaB);

        const result = flatProfile(loader, constraintSchemaB);

        // Check specific properties rather than exact equality
        expect(result.fields).toBeDefined();
        expect(result.fields?.common).toBeDefined();
        expect(result.fields?.common.type).toEqual(booleanType);
    });

    it('should handle constraints without fields', () => {
        const baseSchema = new TypeSchema({
            identifier: {
                name: 'Base',
                package: 'test',
                kind: 'resource',
                version: '1.0.0',
                url: 'http://example.org/StructureDefinition/Base',
            },
            fields: {
                baseField: {
                    type: stringType,
                    required: false,
                    array: false,
                },
            },
        });

        const constraintSchemaA = new TypeSchema({
            identifier: {
                name: 'ConstraintA',
                package: 'test',
                kind: 'constraint',
                version: '1.0.0',
                url: 'http://example.org/StructureDefinition/ConstraintA',
            },
            base: baseSchema.identifier,
            fields: {
                fieldA: {
                    type: numberType,
                    required: false,
                    array: false,
                },
            },
        });

        const constraintSchemaB = new TypeSchema({
            identifier: {
                name: 'ConstraintB',
                package: 'test',
                kind: 'constraint',
                version: '1.0.0',
                url: 'http://example.org/StructureDefinition/ConstraintB',
            },
            base: constraintSchemaA.identifier,
        });

        loader.addSchema(baseSchema);
        loader.addSchema(constraintSchemaA);
        loader.addSchema(constraintSchemaB);

        const result = flatProfile(loader, constraintSchemaB);

        // Check specific properties rather than exact equality
        expect(result.fields).toBeDefined();
        expect(result.fields?.fieldA).toBeDefined();
        expect(result.fields?.fieldA.type).toEqual(numberType);
    });

    it('should throw error when no non-constraint schema is found', () => {
        const constraintSchema = new TypeSchema({
            identifier: {
                name: 'Constraint',
                package: 'test',
                kind: 'constraint',
                version: '1.0.0',
                url: 'http://example.org/StructureDefinition/Constraint',
            },
        });

        loader.addSchema(constraintSchema);

        expect(() => flatProfile(loader, constraintSchema)).toThrow(
            'No non-constraint schema found in hierarchy for Constraint',
        );
    });

    it('should preserve identifier from original schema', () => {
        const baseSchema = new TypeSchema({
            identifier: {
                name: 'Base',
                package: 'test',
                kind: 'resource',
                version: '1.0.0',
                url: 'http://example.org/StructureDefinition/Base',
            },
            fields: {
                baseField: {
                    type: stringType,
                    required: false,
                    array: false,
                },
            },
        });

        const constraintSchema = new TypeSchema({
            identifier: {
                name: 'Constraint',
                package: 'test',
                kind: 'constraint',
                version: '1.0.0',
                url: 'http://example.org/StructureDefinition/Constraint',
            },
            base: baseSchema.identifier,
            fields: {
                constraintField: {
                    type: numberType,
                    required: false,
                    array: false,
                },
            },
        });

        loader.addSchema(baseSchema);
        loader.addSchema(constraintSchema);

        const result = flatProfile(loader, constraintSchema);

        expect(result.identifier).toEqual(constraintSchema.identifier);
    });
});
