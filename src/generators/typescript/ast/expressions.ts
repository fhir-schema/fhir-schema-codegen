/**
 * Expression builders for type-safe code generation
 * These builders create expression strings in a composable, type-safe way
 */

export type Expression = string;

/**
 * Marker for spread expressions in objects
 */
export interface SpreadExpression {
    __spread: true;
    expression: Expression;
}

export function isSpreadExpression(value: unknown): value is SpreadExpression {
    return typeof value === 'object' && value !== null && '__spread' in value;
}

/**
 * Expression builders
 */
export const Expr = {
    /**
     * Create identifier: `foo`
     */
    id: (name: string): Expression => {
        return name;
    },

    /**
     * Create string literal: `'foo'`
     */
    string: (value: string): Expression => {
        // Escape single quotes and backslashes
        const escaped = value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
        return `'${escaped}'`;
    },

    /**
     * Create number literal: `42`
     */
    number: (value: number): Expression => {
        return String(value);
    },

    /**
     * Create boolean literal: `true` or `false`
     */
    boolean: (value: boolean): Expression => {
        return String(value);
    },

    /**
     * Create undefined literal: `undefined`
     */
    undefined: (): Expression => {
        return 'undefined';
    },

    /**
     * Create null literal: `null`
     */
    null: (): Expression => {
        return 'null';
    },

    /**
     * Create array literal: `[1, 2, 3]`
     */
    array: (elements: Expression[]): Expression => {
        if (elements.length === 0) {
            return '[]';
        }
        return `[${elements.join(', ')}]`;
    },

    /**
     * Create object literal with proper formatting
     * Supports spread expressions
     *
     * Use objWithSpreads for objects that include spread properties
     */
    object: (properties: Record<string, Expression>): Expression => {
        const entries = Object.entries(properties);
        if (entries.length === 0) {
            return '{}';
        }

        const props = entries.map(([key, value]) => {
            // Check if key needs quotes (contains special chars)
            const needsQuotes = /[^a-zA-Z0-9_$]/.test(key);
            const keyStr = needsQuotes ? `'${key}'` : key;

            return `${keyStr}: ${value}`;
        });

        return `{ ${props.join(', ')} }`;
    },

    /**
     * Create object literal with spread support
     * Takes an array to preserve order and allow spreads
     *
     * @example
     * objWithSpreads([
     *   Expr.spread('resource'),
     *   ['meta', Expr.object({ ... })]
     * ])
     */
    objWithSpreads: (
        entries: Array<SpreadExpression | [string, Expression]>,
    ): Expression => {
        if (entries.length === 0) {
            return '{}';
        }

        const props = entries.map(entry => {
            if (isSpreadExpression(entry)) {
                return `...${entry.expression}`;
            }

            const [key, value] = entry;
            // Check if key needs quotes (contains special chars)
            const needsQuotes = /[^a-zA-Z0-9_$]/.test(key);
            const keyStr = needsQuotes ? `'${key}'` : key;

            return `${keyStr}: ${value}`;
        });

        return `{ ${props.join(', ')} }`;
    },

    /**
     * Create spread expression marker: `...foo`
     * Use with Expr.objWithSpreads()
     */
    spread: (expression: Expression): SpreadExpression => {
        return { __spread: true, expression };
    },

    /**
     * Create ternary expression: `condition ? trueExpr : falseExpr`
     */
    ternary: (condition: Expression, trueExpr: Expression, falseExpr: Expression): Expression => {
        return `${condition} ? ${trueExpr} : ${falseExpr}`;
    },

    /**
     * Create property access: `obj.prop`
     */
    prop: (object: Expression, property: string): Expression => {
        // Check if property needs bracket notation
        const needsBrackets = /[^a-zA-Z0-9_$]/.test(property);
        if (needsBrackets) {
            return `${object}['${property}']`;
        }
        return `${object}.${property}`;
    },

    /**
     * Create element access: `arr[index]`
     */
    element: (array: Expression, index: Expression): Expression => {
        return `${array}[${index}]`;
    },

    /**
     * Create function call: `foo(arg1, arg2)`
     */
    call: (func: Expression, args: Expression[]): Expression => {
        return `${func}(${args.join(', ')})`;
    },

    /**
     * Create method call: `obj.method(arg1, arg2)`
     */
    method: (object: Expression, method: string, args: Expression[]): Expression => {
        return `${object}.${method}(${args.join(', ')})`;
    },

    /**
     * Create binary operation: `a + b`, `a === b`, etc.
     */
    binary: (left: Expression, operator: string, right: Expression): Expression => {
        return `${left} ${operator} ${right}`;
    },

    /**
     * Create unary operation: `!foo`, `-bar`, etc.
     */
    unary: (operator: string, operand: Expression): Expression => {
        return `${operator}${operand}`;
    },

    /**
     * Create template literal: `` `Hello ${name}` ``
     *
     * Note: This follows JavaScript's tagged template literal structure where
     * parts.length === expressions.length + 1. For a simpler API, use templateString.
     *
     * @example
     * // For `Hello ${name}!`:
     * template(['Hello ', '!'], [Expr.id('name')])
     */
    template: (parts: string[], expressions: Expression[]): Expression => {
        let result = '`';
        for (let i = 0; i < parts.length; i++) {
            result += parts[i];
            if (i < expressions.length) {
                result += '${' + expressions[i] + '}';
            }
        }
        result += '`';
        return result;
    },

    /**
     * Create template literal string (simpler API)
     *
     * @example
     * templateString('Hello ${0}!', [Expr.id('name')])
     * // Result: `Hello ${name}!`
     *
     * templateString('${0}/${1}', ['T', 'string'])
     * // Result: `${T}/${string}`
     */
    templateString: (template: string, expressions: Expression[]): Expression => {
        let result = template;
        expressions.forEach((expr, index) => {
            result = result.replace(`\${${index}}`, `\${${expr}}`);
        });
        return `\`${result}\``;
    },

    /**
     * Create arrow function: `(x, y) => expr` or `(x, y) => { statements }`
     */
    arrow: (params: string[], body: Expression | string[]): Expression => {
        const paramList = params.length === 1 ? params[0] : `(${params.join(', ')})`;

        if (typeof body === 'string') {
            // Expression body
            return `${paramList} => ${body}`;
        } else {
            // Block body
            const statements = body.join('\n');
            return `${paramList} => {\n${statements}\n}`;
        }
    },

    /**
     * Create new expression: `new Foo(arg1, arg2)`
     */
    new: (className: string, args: Expression[]): Expression => {
        return `new ${className}(${args.join(', ')})`;
    },

    /**
     * Create parenthesized expression: `(expr)`
     */
    paren: (expr: Expression): Expression => {
        return `(${expr})`;
    },

    /**
     * Create typeof expression: `typeof foo`
     */
    typeof: (expr: Expression): Expression => {
        return `typeof ${expr}`;
    },

    /**
     * Create await expression: `await promise`
     */
    await: (expr: Expression): Expression => {
        return `await ${expr}`;
    },
};
