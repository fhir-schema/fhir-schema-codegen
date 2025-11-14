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
        (s) => s.identifier.kind !== 'constraint' && s.identifier.kind !== 'complex-type-constraint',
    );
    if (!nonConstraintSchema) {
        throw new Error(`No non-constraint schema found in hierarchy for ${typeRef.name}`);
    }
    return nonConstraintSchema.identifier;
};

export const flatProfile = (loader: SchemaLoader, schema: TypeSchema): TypeSchema => {
    const hierarchySchemas = hierarchy(loader, schema);
    const constraintSchemas = hierarchySchemas.filter(
        (s) => s.identifier.kind === 'constraint' || s.identifier.kind === 'complex-type-constraint'
    );
    const nonConstraintSchema = hierarchySchemas.find(
        (s) => s.identifier.kind !== 'constraint' && s.identifier.kind !== 'complex-type-constraint'
    );

    if (!nonConstraintSchema) {
        throw new Error(
            `No non-constraint schema found in hierarchy for ${schema.identifier.name}`,
        );
    }

    // Start with all base type fields
    const mergedFields = { ...nonConstraintSchema.fields };

    // Apply constraints from profile hierarchy
    for (const schema of constraintSchemas.slice().reverse()) {
        if (!schema.fields) continue;

        for (const [fieldName, fieldConstraints] of Object.entries(schema.fields)) {
            const baseField = mergedFields[fieldName];
            if (baseField) {
                // Preserve constraints from base if profile doesn't provide them
                const mergedField = { ...baseField, ...fieldConstraints };
                if (baseField.enum && !fieldConstraints.enum) {
                    mergedField.enum = baseField.enum;
                }
                if (baseField.binding && !fieldConstraints.binding) {
                    mergedField.binding = baseField.binding;
                }
                // Always use base reference constraints to maintain TypeScript compatibility
                // Narrowing references breaks subtype compatibility (can't assign NoBasisPatient to Patient)
                if (baseField.reference) {
                    mergedField.reference = baseField.reference;
                }
                mergedFields[fieldName] = mergedField;
            } else {
                mergedFields[fieldName] = { ...fieldConstraints };
            }
        }
    }

    const deps: { [url: string]: TypeRef } = {};

    // Add base type dependencies (for field types like Attachment, ContactPoint, etc.)
    for (const e of (nonConstraintSchema.dependencies ?? [])) {
        deps[e.url] = e;
    }

    // Add constraint schema dependencies
    for (const e of constraintSchemas.flatMap((e) => e.dependencies ?? [])) {
        deps[e.url] = e;
    }

    // Add base type to dependencies so it gets imported
    deps[nonConstraintSchema.identifier.url] = nonConstraintSchema.identifier;

    // Add profileConstraints from fields to dependencies so they get imported
    for (const field of Object.values(mergedFields)) {
        if (field.profileConstraints && field.profileConstraints.length > 0) {
            for (const constraint of field.profileConstraints) {
                if (constraint.url) {
                    deps[constraint.url] = constraint;
                }
            }
        }
    }

    const dependencies = Object.values(deps);

    return new TypeSchema({
        ...schema,
        base: nonConstraintSchema.identifier,
        fields: mergedFields,
        dependencies: dependencies,
    });
};
