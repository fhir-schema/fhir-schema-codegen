/**
 * Statement builders for TypeScript code generation
 */

import type { CodeBlockWriter } from 'ts-morph';
import type { Expression } from './expressions';
import type { TypeNode } from './types';

/**
 * Statement writer function type
 */
export type StatementWriter = (writer: CodeBlockWriter) => void;

/**
 * Statement builders
 * These return functions that write to a CodeBlockWriter
 */
export const Stmt = {
    /**
     * Create return statement: `return expr;`
     */
    return: (expr: Expression): StatementWriter => {
        return (writer: CodeBlockWriter) => {
            writer.writeLine(`return ${expr};`);
        };
    },

    /**
     * Create const declaration: `const name = initializer;`
     */
    const: (name: string, initializer: Expression, type?: TypeNode): StatementWriter => {
        return (writer: CodeBlockWriter) => {
            const typeAnnotation = type ? `: ${type}` : '';
            writer.writeLine(`const ${name}${typeAnnotation} = ${initializer};`);
        };
    },

    /**
     * Create let declaration: `let name = initializer;`
     */
    let: (name: string, initializer: Expression, type?: TypeNode): StatementWriter => {
        return (writer: CodeBlockWriter) => {
            const typeAnnotation = type ? `: ${type}` : '';
            writer.writeLine(`let ${name}${typeAnnotation} = ${initializer};`);
        };
    },

    /**
     * Create if statement: `if (condition) { ...then } else { ...otherwise }`
     */
    if: (
        condition: Expression,
        thenStmts: StatementWriter[],
        elseStmts?: StatementWriter[],
    ): StatementWriter => {
        return (writer: CodeBlockWriter) => {
            writer.write(`if (${condition})`).block(() => {
                thenStmts.forEach(stmt => stmt(writer));
            });

            if (elseStmts && elseStmts.length > 0) {
                writer.write(' else').block(() => {
                    elseStmts.forEach(stmt => stmt(writer));
                });
            }
        };
    },

    /**
     * Create throw statement: `throw new Error(message);`
     */
    throw: (message: string | Expression): StatementWriter => {
        return (writer: CodeBlockWriter) => {
            const errorExpr =
                typeof message === 'string'
                    ? `new Error('${message.replace(/'/g, "\\'")}')`
                    : `new Error(${message})`;
            writer.writeLine(`throw ${errorExpr};`);
        };
    },

    /**
     * Create expression statement: `expr;`
     */
    expr: (expr: Expression): StatementWriter => {
        return (writer: CodeBlockWriter) => {
            writer.writeLine(`${expr};`);
        };
    },

    /**
     * Create raw line (use sparingly)
     */
    raw: (line: string): StatementWriter => {
        return (writer: CodeBlockWriter) => {
            writer.writeLine(line);
        };
    },

    /**
     * Create for loop: `for (let i = 0; i < n; i++) { ... }`
     */
    for: (
        initializer: string,
        condition: Expression,
        incrementor: string,
        body: StatementWriter[],
    ): StatementWriter => {
        return (writer: CodeBlockWriter) => {
            writer.write(`for (${initializer}; ${condition}; ${incrementor})`).block(() => {
                body.forEach(stmt => stmt(writer));
            });
        };
    },

    /**
     * Create for-of loop: `for (const item of items) { ... }`
     */
    forOf: (variable: string, iterable: Expression, body: StatementWriter[]): StatementWriter => {
        return (writer: CodeBlockWriter) => {
            writer.write(`for (const ${variable} of ${iterable})`).block(() => {
                body.forEach(stmt => stmt(writer));
            });
        };
    },

    /**
     * Create while loop: `while (condition) { ... }`
     */
    while: (condition: Expression, body: StatementWriter[]): StatementWriter => {
        return (writer: CodeBlockWriter) => {
            writer.write(`while (${condition})`).block(() => {
                body.forEach(stmt => stmt(writer));
            });
        };
    },

    /**
     * Create switch statement
     */
    switch: (
        expr: Expression,
        cases: Array<{ value: Expression; stmts: StatementWriter[] }>,
        defaultCase?: StatementWriter[],
    ): StatementWriter => {
        return (writer: CodeBlockWriter) => {
            writer.write(`switch (${expr})`).block(() => {
                cases.forEach(c => {
                    writer.writeLine(`case ${c.value}:`);
                    writer.indent(() => {
                        c.stmts.forEach(stmt => stmt(writer));
                        writer.writeLine('break;');
                    });
                });

                if (defaultCase && defaultCase.length > 0) {
                    writer.writeLine('default:');
                    writer.indent(() => {
                        defaultCase.forEach(stmt => stmt(writer));
                    });
                }
            });
        };
    },

    /**
     * Create try-catch statement
     */
    tryCatch: (
        tryStmts: StatementWriter[],
        catchVar: string,
        catchStmts: StatementWriter[],
        finallyStmts?: StatementWriter[],
    ): StatementWriter => {
        return (writer: CodeBlockWriter) => {
            writer.write('try').block(() => {
                tryStmts.forEach(stmt => stmt(writer));
            });

            writer.write(` catch (${catchVar})`).block(() => {
                catchStmts.forEach(stmt => stmt(writer));
            });

            if (finallyStmts && finallyStmts.length > 0) {
                writer.write(' finally').block(() => {
                    finallyStmts.forEach(stmt => stmt(writer));
                });
            }
        };
    },

    /**
     * Create blank line
     */
    blankLine: (): StatementWriter => {
        return (writer: CodeBlockWriter) => {
            writer.blankLine();
        };
    },

    /**
     * Create comment line
     */
    comment: (text: string): StatementWriter => {
        return (writer: CodeBlockWriter) => {
            writer.writeLine(`// ${text}`);
        };
    },

    /**
     * Create multi-line comment
     */
    blockComment: (lines: string[]): StatementWriter => {
        return (writer: CodeBlockWriter) => {
            writer.writeLine('/*');
            lines.forEach(line => writer.writeLine(` * ${line}`));
            writer.writeLine(' */');
        };
    },
};
