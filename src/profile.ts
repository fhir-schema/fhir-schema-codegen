import { TypeSchema } from './typeschema';
import type { SchemaLoader } from './loader';

export const hierarchy = (loader: SchemaLoader, schema: TypeSchema): TypeSchema[] => {
    let res: TypeSchema[] = [];
    let cur: TypeSchema | undefined = schema;

    while (cur) {
        res.push(cur);
        if (cur.base === undefined) break;

        const resolved = loader.resolveTypeIdentifier(cur.base);
        if (!resolved) {
            throw new Error(
                `Failed to resolve base type: ${cur.base.name} in package ${cur.base.package}`,
            );
        }
        cur = resolved;
    }
    return res;
};

export const flatProfile = (loader: SchemaLoader, schema: TypeSchema): TypeSchema => {
    const hierarchySchemas = hierarchy(loader, schema);

    const constraintSchemas = hierarchySchemas.filter((s) => s.identifier.kind === 'constraint');
    const nonConstraintSchema = hierarchySchemas.find((s) => s.identifier.kind !== 'constraint');

    if (!nonConstraintSchema) {
        throw new Error(
            `No non-constraint schema found in hierarchy for ${schema.identifier.name}`,
        );
    }

    const mergedFields = { ...(nonConstraintSchema.fields || {}) };
    for (const schema of constraintSchemas.slice().reverse()) {
        if (!schema.fields) continue;

        for (const [fieldName, fieldConstraints] of Object.entries(schema.fields)) {
            if (mergedFields[fieldName]) {
                mergedFields[fieldName] = { ...mergedFields[fieldName], ...fieldConstraints };
            } else {
                mergedFields[fieldName] = { ...fieldConstraints };
            }
        }
    }

    return new TypeSchema({
        ...schema,
        base: nonConstraintSchema.identifier,
        fields: mergedFields,
    });
};
