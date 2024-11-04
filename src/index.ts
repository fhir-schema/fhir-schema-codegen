import type { FHIRSchema } from "./fhirschema";
import type { TypeSchema } from "./typeschema";

export { type FHIRSchema } from "./fhirschema";
export { type TypeSchema } from "./typeschema";

export function schema2classes(schema: FHIRSchema): TypeSchema {
    let res: TypeSchema = {
        kind: schema.kind,
        name: schema.name,
        package: schema.package,
        nestedClasses: [],
        elements: {}
    };
    return res;
}