import { describe, it, expect } from 'vitest';
import { Project, IndentationText, QuoteKind } from 'ts-morph';
import { Decl, Expr, Stmt, Type } from '../../src/generators/typescript/ast';

describe('TypeScript AST Builders', () => {
    let project: Project;

    const createSourceFile = () => {
        project = new Project({
            useInMemoryFileSystem: true,
            manipulationSettings: {
                indentationText: IndentationText.FourSpaces,
                quoteKind: QuoteKind.Single,
            },
        });
        return project.createSourceFile('test.ts');
    };

    describe('Expr - Expression Builders', () => {
        it('should create string literals', () => {
            const expr = Expr.string('hello world');
            expect(expr).toBe("'hello world'");
        });

        it('should escape strings properly', () => {
            const expr = Expr.string("it's working");
            expect(expr).toBe("'it\\'s working'");
        });

        it('should create number literals', () => {
            expect(Expr.number(42)).toBe('42');
            expect(Expr.number(3.14)).toBe('3.14');
        });

        it('should create boolean literals', () => {
            expect(Expr.boolean(true)).toBe('true');
            expect(Expr.boolean(false)).toBe('false');
        });

        it('should create array literals', () => {
            const expr = Expr.array([Expr.string('a'), Expr.string('b'), Expr.number(3)]);
            expect(expr).toBe("['a', 'b', 3]");
        });

        it('should create object literals', () => {
            const expr = Expr.object({
                name: Expr.string('John'),
                age: Expr.number(30),
                active: Expr.boolean(true),
            });
            expect(expr).toBe("{ name: 'John', age: 30, active: true }");
        });

        it('should create object with spread', () => {
            const expr = Expr.objWithSpreads([
                Expr.spread('resource'),
                [
                    'meta',
                    Expr.object({
                        profile: Expr.array([Expr.string('http://example.com')]),
                    }),
                ],
            ]);
            expect(expr).toContain('...resource');
            expect(expr).toContain('meta:');
            expect(expr).toContain('profile:');
        });

        it('should create property access', () => {
            expect(Expr.prop('obj', 'field')).toBe('obj.field');
        });

        it('should create function calls', () => {
            const expr = Expr.call('foo', [Expr.string('arg1'), Expr.number(42)]);
            expect(expr).toBe("foo('arg1', 42)");
        });

        it('should create binary expressions', () => {
            const expr = Expr.binary('x', '===', Expr.undefined());
            expect(expr).toBe('x === undefined');
        });

        it('should create template literals', () => {
            const expr = Expr.templateString('Hello ${0}!', [Expr.id('name')]);
            expect(expr).toBe('`Hello ${name}!`');

            const expr2 = Expr.templateString('${0}/${1}', ['T', 'string']);
            expect(expr2).toBe('`${T}/${string}`');
        });

        it('should create arrow functions', () => {
            const expr = Expr.arrow(['x', 'y'], 'x + y');
            expect(expr).toBe('(x, y) => x + y');
        });
    });

    describe('Type - Type Builders', () => {
        it('should create simple type references', () => {
            expect(Type.ref('string')).toBe('string');
            expect(Type.ref('Patient')).toBe('Patient');
        });

        it('should create array types', () => {
            expect(Type.array('string')).toBe('string[]');
            expect(Type.array('Patient')).toBe('Patient[]');
        });

        it('should create union types', () => {
            const type = Type.union(['string', 'number', 'boolean']);
            expect(type).toBe('string | number | boolean');
        });

        it('should create string literal types', () => {
            const type = Type.union([
                Type.stringLiteral('phone'),
                Type.stringLiteral('email'),
                Type.stringLiteral('fax'),
            ]);
            expect(type).toBe("'phone' | 'email' | 'fax'");
        });

        it('should create generic types', () => {
            const type = Type.generic('Reference', [Type.stringLiteral('Patient')]);
            expect(type).toBe("Reference<'Patient'>");
        });

        it('should create object types', () => {
            const type = Type.object([
                { name: 'id', type: 'string', optional: false },
                { name: 'name', type: 'string', optional: true },
            ]);
            expect(type).toBe('{ id: string; name?: string }');
        });

        it('should create template literal types', () => {
            const type = Type.templateLiteralString('${0}/${1}', ['T', 'string']);
            expect(type).toBe('`${T}/${string}`');

            const type2 = Type.templateLiteralString('hello-${0}', ['string']);
            expect(type2).toBe('`hello-${string}`');
        });
    });

    describe('Decl - Declaration Builders', () => {
        it('should add imports', () => {
            const sf = createSourceFile();
            Decl.import(sf, './types', ['Patient', 'Observation']);

            const text = sf.getFullText();
            expect(text).toContain("import { Patient, Observation } from './types';");
        });

        it('should add interface', () => {
            const sf = createSourceFile();
            Decl.interface(sf, {
                name: 'ContactPoint',
                exported: true,
                extends: ['Element'],
                properties: [
                    {
                        name: 'system',
                        type: Type.union([
                            Type.stringLiteral('phone'),
                            Type.stringLiteral('email'),
                        ]),
                        optional: true,
                    },
                    {
                        name: 'value',
                        type: 'string',
                        optional: true,
                    },
                ],
            });

            const text = sf.getFullText();
            expect(text).toContain('export interface ContactPoint extends Element');
            expect(text).toContain("system?: 'phone' | 'email'");
            expect(text).toContain('value?: string');
        });

        it('should add type alias', () => {
            const sf = createSourceFile();
            Decl.typeAlias(sf, 'ResourceType', Type.keyof('ResourceTypeMap'));

            const text = sf.getFullText();
            expect(text).toContain('export type ResourceType = keyof ResourceTypeMap;');
        });

        it('should add const declaration', () => {
            const sf = createSourceFile();
            Decl.const(sf, 'API_URL', Expr.string('https://api.example.com'));

            const text = sf.getFullText();
            expect(text).toContain("export const API_URL = 'https://api.example.com';");
        });

        it('should add arrow function', () => {
            const sf = createSourceFile();
            Decl.arrowFunction(sf, 'attachProfile', {
                parameters: [
                    { name: 'resource', type: 'Patient' },
                    { name: 'profile', type: 'ProfileData' },
                ],
                returnType: 'Patient',
                body: [
                    Stmt.return(
                        Expr.objWithSpreads([
                            Expr.spread('resource'),
                            [
                                'meta',
                                Expr.object({
                                    profile: Expr.array([Expr.string('http://example.com/profile')]),
                                }),
                            ],
                        ]),
                    ),
                ],
            });

            const text = sf.getFullText();
            expect(text).toContain('export const attachProfile');
            expect(text).toContain('(resource: Patient, profile: ProfileData): Patient');
            expect(text).toContain('...resource');
            expect(text).toContain('meta:');
            expect(text).toContain("profile: ['http://example.com/profile']");
        });
    });

    describe('Stmt - Statement Builders', () => {
        it('should create return statements', () => {
            const sf = createSourceFile();
            Decl.arrowFunction(sf, 'getTrue', {
                parameters: [],
                returnType: 'boolean',
                body: [Stmt.return(Expr.boolean(true))],
            });

            const text = sf.getFullText();
            expect(text).toContain('return true;');
        });

        it('should create const declarations', () => {
            const sf = createSourceFile();
            Decl.arrowFunction(sf, 'test', {
                parameters: [],
                body: [Stmt.const('x', Expr.number(42), 'number')],
            });

            const text = sf.getFullText();
            expect(text).toContain('const x: number = 42;');
        });

        it('should create if statements', () => {
            const sf = createSourceFile();
            Decl.arrowFunction(sf, 'validate', {
                parameters: [{ name: 'value', type: 'string | undefined' }],
                body: [
                    Stmt.if(
                        Expr.binary('value', '===', Expr.undefined()),
                        [Stmt.throw('Value is required')],
                    ),
                ],
            });

            const text = sf.getFullText();
            expect(text).toContain('if (value === undefined)');
            expect(text).toContain("throw new Error('Value is required');");
        });
    });

    describe('Complete Example', () => {
        it('should generate a complete interface file', () => {
            const sf = createSourceFile();

            // Add disclaimer
            Decl.comment(sf, 'WARNING: This file is autogenerated');
            Decl.blankLine(sf);

            // Add imports
            Decl.import(sf, '../hl7-fhir-r4-core/Element', ['Element']);
            Decl.import(sf, '../hl7-fhir-r4-core/Period', ['Period']);
            Decl.blankLine(sf);

            // Add interface
            Decl.interface(sf, {
                name: 'ContactPoint',
                exported: true,
                extends: ['Element'],
                properties: [
                    { name: 'period', type: 'Period', optional: true },
                    { name: 'rank', type: 'number', optional: true },
                    { name: '_rank', type: 'Element', optional: true },
                    {
                        name: 'system',
                        type: Type.union([
                            Type.stringLiteral('phone'),
                            Type.stringLiteral('fax'),
                            Type.stringLiteral('email'),
                        ]),
                        optional: true,
                    },
                    { name: '_system', type: 'Element', optional: true },
                    { name: 'value', type: 'string', optional: true },
                ],
            });

            const text = sf.getFullText();
            expect(text).toContain('// WARNING: This file is autogenerated');
            expect(text).toContain("import { Element } from '../hl7-fhir-r4-core/Element'");
            expect(text).toContain('export interface ContactPoint extends Element');
            expect(text).toContain('period?: Period');
            expect(text).toContain("system?: 'phone' | 'fax' | 'email'");
        });
    });
});
