import type { SchemaLoader } from './loader';
import { type TypeRef, TypeSchema } from './typeschema';

export const hierarchy = (loader: SchemaLoader, schema: TypeSchema): TypeSchema[] => {
    const res: TypeSchema[] = [];
    let cur: TypeSchema | undefined = schema;

    while (cur) {
        res.push(cur);
        if (cur.base === undefined) break;

        const resolved = loader.resolveTypeIdentifier(cur.base);
        if (!resolved) {
            throw new Error(`Failed to resolve base type: ${JSON.stringify(cur.base)}`);
        }
        cur = resolved;
    }
    return res;
};

export const findSpecialization = (loader: SchemaLoader, typeRef: TypeRef): TypeRef => {
    const schema = loader.resolveTypeIdentifier(typeRef);
    if (!schema) {
        return typeRef;
    }

    const nonConstraintSchema = hierarchy(loader, schema).find(
        (s) => s.identifier.kind !== 'constraint',
    );
    if (!nonConstraintSchema) {
        throw new Error(`No non-constraint schema found in hierarchy for ${typeRef.name}`);
    }
    return nonConstraintSchema.identifier;
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

    const mergedFields = {};
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

    const deps: { [url: string]: TypeRef } = {};
    for (const e of constraintSchemas.flatMap((e) => e.dependencies ?? [])) {
        deps[e.url] = e;
    }

    const dependencies = Object.values(deps);

    return new TypeSchema({
        ...schema,
        base: nonConstraintSchema.identifier,
        fields: mergedFields,
        dependencies: dependencies,
    });
};
