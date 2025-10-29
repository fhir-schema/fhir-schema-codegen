import {SchemaLoader} from "@fscg/loader";
import {TypeRef, TypeSchema} from "@fscg/typeschema";

export class SchemaLoaderFacade {
    private readonly complexTypesByName: Record<string, TypeSchema> = {};
    private readonly resourcesByName: Record<string, TypeSchema> = {};

    private complexTypeNames : string[] | undefined = undefined;
    private resourceNames : string[] | undefined = undefined;

    constructor(private readonly loader: SchemaLoader) {
        this.loader.complexTypes().forEach(schema => {
            this.complexTypesByName[schema.identifier.name] = schema;
        });
        this.loader.resources().forEach(schema => {
            this.resourcesByName[schema.identifier.name] = schema;
        });
    }

    public get(typeRef: TypeRef){
        if(typeRef.kind === 'complex-type'){
            return this.getComplexType(typeRef.name);
        }
        if(typeRef.kind === 'resource'){
            return this.getResource(typeRef.name);
        }
        throw new Error(`Unknown type ${typeRef.kind}`);
    }

    public getComplexType(name: string): TypeSchema | undefined {
        return this.complexTypesByName[name];
    }
    public getResource(name: string): TypeSchema | undefined {
        return this.resourcesByName[name];
    }

    public getComplexTypeNames(): string[]{
        if(this.complexTypeNames === undefined){
            this.complexTypeNames = this.loader.complexTypes()
                .map(schema => schema.identifier.name)
                .sort();
        }
        return this.complexTypeNames;
    }
    public getResourceNames(): string[]{
        if(this.resourceNames === undefined){
            this.resourceNames = this.loader.resources()
                .map(schema => schema.identifier.name)
                .sort();
        }
        return this.resourceNames;
    }
}