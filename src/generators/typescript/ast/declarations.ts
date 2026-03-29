/**
 * Declaration builders for TypeScript top-level declarations
 */

import {
    type SourceFile,
    type OptionalKind,
    type PropertySignatureStructure,
    type ParameterDeclarationStructure,
    type CodeBlockWriter,
    StructureKind,
    VariableDeclarationKind,
} from 'ts-morph';
import type { TypeNode } from './types';
import type { Expression } from './expressions';
import type { StatementWriter } from './statements';

/**
 * Property configuration for interfaces
 */
export interface PropertyConfig {
    name: string;
    type: TypeNode;
    optional?: boolean;
    readonly?: boolean;
    docs?: string;
}

/**
 * Parameter configuration for functions
 */
export interface ParameterConfig {
    name: string;
    type: TypeNode;
    optional?: boolean;
    defaultValue?: Expression;
}

/**
 * Declaration builders that modify a SourceFile
 */
export const Decl = {
    /**
     * Add import declaration: `import { A, B } from 'module';`
     */
    import: (sourceFile: SourceFile, moduleSpecifier: string, namedImports: string[]): void => {
        sourceFile.addImportDeclaration({
            moduleSpecifier,
            namedImports,
        });
    },

    /**
     * Add default import: `import Foo from 'module';`
     */
    importDefault: (sourceFile: SourceFile, moduleSpecifier: string, defaultImport: string): void => {
        sourceFile.addImportDeclaration({
            moduleSpecifier,
            defaultImport,
        });
    },

    /**
     * Add namespace import: `import * as Foo from 'module';`
     */
    importNamespace: (sourceFile: SourceFile, moduleSpecifier: string, namespaceImport: string): void => {
        sourceFile.addImportDeclaration({
            moduleSpecifier,
            namespaceImport,
        });
    },

    /**
     * Add interface declaration
     */
    interface: (
        sourceFile: SourceFile,
        config: {
            name: string;
            exported?: boolean;
            extends?: string[];
            properties: PropertyConfig[];
            typeParameters?: string[];
            docs?: string[];
        },
    ): void => {
        const properties: OptionalKind<PropertySignatureStructure>[] = config.properties.map(
            prop => ({
                kind: StructureKind.PropertySignature,
                name: prop.name,
                type: prop.type,
                hasQuestionToken: prop.optional,
                isReadonly: prop.readonly,
                docs: prop.docs ? [{ description: prop.docs }] : undefined,
            }),
        );

        sourceFile.addInterface({
            name: config.name,
            isExported: config.exported ?? true,
            extends: config.extends,
            properties,
            typeParameters: config.typeParameters,
            docs: config.docs?.map(d => ({ description: d })),
        });
    },

    /**
     * Add type alias declaration: `export type Foo = Bar;`
     */
    typeAlias: (
        sourceFile: SourceFile,
        name: string,
        type: TypeNode,
        config?: {
            exported?: boolean;
            typeParameters?: string[];
            docs?: string[];
        },
    ): void => {
        sourceFile.addTypeAlias({
            name,
            type,
            isExported: config?.exported ?? true,
            typeParameters: config?.typeParameters,
            docs: config?.docs?.map(d => ({ description: d })),
        });
    },

    /**
     * Add const variable: `export const foo = value;`
     */
    const: (
        sourceFile: SourceFile,
        name: string,
        initializer: Expression,
        config?: {
            exported?: boolean;
            type?: TypeNode;
            docs?: string[];
        },
    ): void => {
        sourceFile.addVariableStatement({
            declarationKind: VariableDeclarationKind.Const,
            isExported: config?.exported ?? true,
            declarations: [
                {
                    name,
                    type: config?.type,
                    initializer,
                },
            ],
            docs: config?.docs?.map(d => ({ description: d })),
        });
    },

    /**
     * Add arrow function constant: `export const foo = (x, y) => { ... };`
     */
    arrowFunction: (
        sourceFile: SourceFile,
        name: string,
        config: {
            parameters: ParameterConfig[];
            returnType?: TypeNode;
            body: StatementWriter[];
            exported?: boolean;
            docs?: string[];
        },
    ): void => {
        const params: OptionalKind<ParameterDeclarationStructure>[] = config.parameters.map(
            param => ({
                name: param.name,
                type: param.type,
                hasQuestionToken: param.optional,
                initializer: param.defaultValue,
            }),
        );

        sourceFile.addVariableStatement({
            declarationKind: VariableDeclarationKind.Const,
            isExported: config.exported ?? true,
            declarations: [
                {
                    name,
                    initializer: (writer: CodeBlockWriter) => {
                        // Write arrow function signature
                        writer.write('(');
                        params.forEach((param, i) => {
                            if (i > 0) writer.write(', ');
                            writer.write(param.name);
                            if (param.hasQuestionToken) writer.write('?');
                            if (param.type) writer.write(`: ${param.type}`);
                            if (param.initializer) writer.write(` = ${param.initializer}`);
                        });
                        writer.write(')');

                        if (config.returnType) {
                            writer.write(`: ${config.returnType}`);
                        }

                        writer.write(' =>');

                        // Write body
                        writer.block(() => {
                            config.body.forEach(stmt => stmt(writer));
                        });
                    },
                },
            ],
            docs: config.docs?.map(d => ({ description: d })),
        });
    },

    /**
     * Add regular function declaration: `export function foo(x, y) { ... }`
     */
    function: (
        sourceFile: SourceFile,
        name: string,
        config: {
            parameters: ParameterConfig[];
            returnType?: TypeNode;
            body: StatementWriter[];
            exported?: boolean;
            async?: boolean;
            docs?: string[];
        },
    ): void => {
        const params: OptionalKind<ParameterDeclarationStructure>[] = config.parameters.map(
            param => ({
                name: param.name,
                type: param.type,
                hasQuestionToken: param.optional,
                initializer: param.defaultValue,
            }),
        );

        sourceFile.addFunction({
            name,
            parameters: params,
            returnType: config.returnType,
            isExported: config.exported ?? true,
            isAsync: config.async,
            statements: writer => {
                config.body.forEach(stmt => stmt(writer));
            },
            docs: config.docs?.map(d => ({ description: d })),
        });
    },

    /**
     * Add export statement: `export { A, B, C };`
     */
    export: (sourceFile: SourceFile, namedExports: string[]): void => {
        sourceFile.addExportDeclaration({
            namedExports,
        });
    },

    /**
     * Add re-export statement: `export { A, B } from 'module';`
     */
    exportFrom: (sourceFile: SourceFile, moduleSpecifier: string, namedExports: string[]): void => {
        sourceFile.addExportDeclaration({
            moduleSpecifier,
            namedExports,
        });
    },

    /**
     * Add comment at top of file (after imports)
     */
    comment: (sourceFile: SourceFile, text: string): void => {
        sourceFile.insertStatements(0, `// ${text}`);
    },

    /**
     * Add multi-line comment
     */
    blockComment: (sourceFile: SourceFile, lines: string[]): void => {
        const comment = ['/*', ...lines.map(l => ` * ${l}`), ' */'].join('\n');
        sourceFile.insertStatements(0, comment);
    },

    /**
     * Add blank line (for spacing)
     */
    blankLine: (sourceFile: SourceFile): void => {
        sourceFile.addStatements('');
    },
};
