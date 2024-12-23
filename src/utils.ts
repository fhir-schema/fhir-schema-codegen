import { TypeSchema } from './typeschema';

export const words = (s: string) => {
    return s.split(/(?<=[a-z])(?=[A-Z])|[-_.\s]/).filter(Boolean);
};

export const capitalCase = (s: string) => {
    return s[0].toUpperCase() + s.substring(1).toLowerCase();
};

export const camelCase = (s: string) => {
    const [first, ...rest] = words(s);
    return [first.toLowerCase(), ...rest.map(capitalCase)].join('');
};

export const pascalCase = (s: string) => {
    return words(s).map(capitalCase).join('');
};

export const snakeCase = (s: string) => {
    return words(s)
        .map((s) => s.toLowerCase())
        .join('_');
};

export const kebabCase = (s: string) => {
    return words(s)
        .map((s) => s.toLowerCase())
        .join('-');
};

const buildDependencyGraph = (schemas: TypeSchema[]): Record<string, string[]> => {
    const nameToMap: Record<string, TypeSchema> = {};
    for (const schema of schemas) {
        nameToMap[schema.name.name] = schema;
    }

    const graph: Record<string, string[]> = {};
    for (const schema of schemas) {
        const name = schema.name.name;
        const base = schema.base?.name;
        if (!graph[name]) {
            graph[name] = [];
        }
        if (base && nameToMap[base]) {
            graph[name].push(base);
        }
        // Doesn't make sense to check fields due to cycle dependencies
        // if (schema.fields) {
        //     for (const [_fieldName, field] of Object.entries(schema.fields)) {
        //         const fieldType = field.type.name;
        //         if (nameToMap[fieldType]) {
        //             console.log(name, " <- ", fieldType)
        //             graph[name].push(fieldType);
        //         }
        //     }
        // }
    }
    return graph;
};

const topologicalSort = (graph: Record<string, string[]>): string[] => {
    const sorted: string[] = [];
    const visited: Record<string, boolean> = {};
    const temp: Record<string, boolean> = {};

    const visit = (node: string) => {
        if (temp[node]) {
            throw new Error(`Graph has cycles ${node}`);
        }
        if (!visited[node]) {
            temp[node] = true;
            for (const neighbor of graph[node]) {
                visit(neighbor);
            }
            temp[node] = false;
            visited[node] = true;
            sorted.push(node);
        }
    };
    for (const node in graph) {
        if (!visited[node]) {
            visit(node);
        }
    }
    return sorted;
};

export const sortSchemasByDeps = (schemas: TypeSchema[]): TypeSchema[] => {
    const graph = buildDependencyGraph(schemas);
    const sorted = topologicalSort(graph);
    return sorted.map((name) => schemas.find((schema) => schema.name.name === name)).filter(Boolean) as TypeSchema[];
};

export const removeConstraints = (shemas: TypeSchema[]): TypeSchema[] => {
    return shemas.filter((schema) => {
        return schema.derivation !== 'constraint';
    });
};
