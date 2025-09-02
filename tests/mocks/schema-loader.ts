import type { TypeSchema, TypeRef } from '../../src/typeschema';
import { SchemaLoader } from '../../src/loader';

export class MockSchemaLoader extends SchemaLoader {
    private schemas: Map<string, TypeSchema>;

    constructor() {
        super({ files: [], dirs: [] });
        this.schemas = new Map();
        this.canonicalResources = { package: [] };
    }

    addSchema(schema: TypeSchema): void {
        const key = `${schema.identifier.package}/${schema.identifier.name}`;
        this.schemas.set(key, schema);
        this.canonicalResources.package.push(schema);
    }

    resolveTypeIdentifier(typeRef: TypeRef): TypeSchema | undefined {
        const key = `${typeRef.package}/${typeRef.name}`;
        return this.schemas.get(key);
    }

    override packageURL(_pkgname: string): string {
        return '';
    }

    override async load(): Promise<void> {}

    override loadNDJSONContent(text: string): void {
        this.canonicalResources.package = Array.from(this.schemas.values());
    }

    override async loadFromFile(_path: string): Promise<boolean> {
        return true;
    }

    override async loadFromDirectory(_path: string): Promise<void> {}
}
