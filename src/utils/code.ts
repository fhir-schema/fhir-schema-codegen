import type { TypeSchema } from '../typeschema';

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
        nameToMap[schema.identifier.name] = schema;
    }

    const graph: Record<string, string[]> = {};
    for (const schema of schemas) {
        const name = schema.identifier.name;
        const base = schema.base?.name;
        if (!graph[name]) {
            graph[name] = [];
        }
        if (base && nameToMap[base]) {
            graph[name].push(base);
        }
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
    return sorted
        .map((name) => schemas.find((schema) => schema.identifier.name === name))
        .filter(Boolean) as TypeSchema[];
};

export const removeConstraints = (shemas: TypeSchema[]): TypeSchema[] => {
    return shemas.filter((schema) => {
        return schema.identifier.kind !== 'constraint';
    });
};

export const groupedByPackage = (schemas: TypeSchema[]): Record<string, TypeSchema[]> => {
    const result: Record<string, TypeSchema[]> = {};

    for (const schema of schemas) {
        if (!result[schema.identifier.package]) {
            result[schema.identifier.package] = [];
        }
        result[schema.identifier.package].push(schema);
    }

    return result;
};

export const canonicalToName = (canonical: string | undefined) => {
    if (!canonical) return undefined;
    return canonical.split('/').pop();
};
