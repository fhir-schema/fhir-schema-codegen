/**
 * Type builders for TypeScript type annotations
 */

export type TypeNode = string;

/**
 * Type builders
 */
export const Type = {
    /**
     * Create simple type reference: `string`, `number`, `Foo`
     */
    ref: (name: string): TypeNode => {
        return name;
    },

    /**
     * Create array type: `T[]`
     */
    array: (elementType: TypeNode): TypeNode => {
        // Use parentheses if the element type is complex (contains |, &, etc.)
        const needsParens = elementType.includes('|') || elementType.includes('&');
        return needsParens ? `(${elementType})[]` : `${elementType}[]`;
    },

    /**
     * Create union type: `A | B | C`
     */
    union: (types: TypeNode[]): TypeNode => {
        if (types.length === 0) {
            return 'never';
        }
        if (types.length === 1) {
            return types[0];
        }
        return types.join(' | ');
    },

    /**
     * Create intersection type: `A & B & C`
     */
    intersection: (types: TypeNode[]): TypeNode => {
        if (types.length === 0) {
            return 'unknown';
        }
        if (types.length === 1) {
            return types[0];
        }
        return types.join(' & ');
    },

    /**
     * Create string literal type: `'foo'`
     */
    stringLiteral: (value: string): TypeNode => {
        const escaped = value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
        return `'${escaped}'`;
    },

    /**
     * Create number literal type: `42`
     */
    numberLiteral: (value: number): TypeNode => {
        return String(value);
    },

    /**
     * Create boolean literal type: `true` or `false`
     */
    booleanLiteral: (value: boolean): TypeNode => {
        return String(value);
    },

    /**
     * Create generic/parameterized type: `Reference<T>`, `Array<string>`
     */
    generic: (name: string, typeArgs: TypeNode[]): TypeNode => {
        if (typeArgs.length === 0) {
            return name;
        }
        return `${name}<${typeArgs.join(', ')}>`;
    },

    /**
     * Create optional type (union with undefined): `T | undefined`
     */
    optional: (type: TypeNode): TypeNode => {
        return `${type} | undefined`;
    },

    /**
     * Create nullable type (union with null): `T | null`
     */
    nullable: (type: TypeNode): TypeNode => {
        return `${type} | null`;
    },

    /**
     * Create tuple type: `[string, number]`
     */
    tuple: (types: TypeNode[]): TypeNode => {
        return `[${types.join(', ')}]`;
    },

    /**
     * Create function type: `(x: string, y: number) => boolean`
     */
    function: (params: Array<{ name: string; type: TypeNode }>, returnType: TypeNode): TypeNode => {
        const paramStr = params.map(p => `${p.name}: ${p.type}`).join(', ');
        return `(${paramStr}) => ${returnType}`;
    },

    /**
     * Create object type literal
     */
    object: (
        properties: Array<{
            name: string;
            type: TypeNode;
            optional?: boolean;
            readonly?: boolean;
        }>,
    ): TypeNode => {
        if (properties.length === 0) {
            return '{}';
        }

        const props = properties.map(prop => {
            const readonly = prop.readonly ? 'readonly ' : '';
            const optional = prop.optional ? '?' : '';
            const name = /[^a-zA-Z0-9_$]/.test(prop.name) ? `'${prop.name}'` : prop.name;
            return `${readonly}${name}${optional}: ${prop.type}`;
        });

        return `{ ${props.join('; ')} }`;
    },

    /**
     * Create indexed access type: `T[K]`
     */
    indexedAccess: (objectType: TypeNode, indexType: TypeNode): TypeNode => {
        return `${objectType}[${indexType}]`;
    },

    /**
     * Create conditional type: `T extends U ? X : Y`
     */
    conditional: (
        checkType: TypeNode,
        extendsType: TypeNode,
        trueType: TypeNode,
        falseType: TypeNode,
    ): TypeNode => {
        return `${checkType} extends ${extendsType} ? ${trueType} : ${falseType}`;
    },

    /**
     * Create mapped type: `{ [K in keyof T]: U }`
     */
    mapped: (keyName: string, keyType: TypeNode, valueType: TypeNode): TypeNode => {
        return `{ [${keyName} in ${keyType}]: ${valueType} }`;
    },

    /**
     * Create keyof type: `keyof T`
     */
    keyof: (type: TypeNode): TypeNode => {
        return `keyof ${type}`;
    },

    /**
     * Create typeof type: `typeof foo`
     */
    typeof: (expr: string): TypeNode => {
        return `typeof ${expr}`;
    },

    /**
     * Create parenthesized type: `(T)`
     */
    paren: (type: TypeNode): TypeNode => {
        return `(${type})`;
    },

    /**
     * Create template literal type: `` `${T}/${string}` ``
     */
    templateLiteral: (parts: string[], types: TypeNode[]): TypeNode => {
        let result = '`';
        for (let i = 0; i < parts.length; i++) {
            result += parts[i];
            if (i < types.length) {
                result += '${' + types[i] + '}';
            }
        }
        result += '`';
        return result;
    },
};

/**
 * Common type shortcuts
 */
export const CommonTypes = {
    string: 'string',
    number: 'number',
    boolean: 'boolean',
    void: 'void',
    any: 'any',
    unknown: 'unknown',
    never: 'never',
    null: 'null',
    undefined: 'undefined',
    object: 'object',
};
