import type { TypeRef, TypeSchema } from '../typeschema';
import type { Generator } from './generator';

export class Helper {
    private generator: Generator;
    private resourceHierarchy: { parent: TypeRef; child: TypeRef }[] | null = [];

    constructor(generator: Generator) {
        this.generator = generator;
        this.resourceHierarchy = null;
    }

    evaluateResourceHierarchy() {
        const resources = this.generator.loader.resources();
        const pairs: { parent: TypeRef; child: TypeRef }[] = [];
        for (const schema of resources) {
            if (schema.base) {
                pairs.push({ parent: schema.base, child: schema.identifier });
            }
        }
        return pairs;
    }

    childrenOf(schemaRef: TypeRef) {
        if (!this.resourceHierarchy) {
            this.resourceHierarchy = this.evaluateResourceHierarchy();
        }
        const childrens = this.resourceHierarchy
            .filter((pair) => pair.parent.name === schemaRef.name)
            .map((pair) => pair.child);
        const subChildrens = childrens.flatMap((child) => this.childrenOf(child));
        return [...[...childrens].map((child) => child), ...subChildrens];
    }

    getPackages(packageResources: TypeSchema[], rootPackage: string): string[] {
        const packages: string[] = [];
        for (const resource of packageResources) {
            const resource_name: string = `${rootPackage}.${resource.identifier.package.replaceAll('.', '_')}`;
            if (!packages.includes(resource_name)) packages.push(resource_name);
        }
        return packages;
    }

    getFamilies(packageResources: TypeSchema[]): Record<string, string[]> {
        const families: Record<string, string[]> = {};
        for (const resource of packageResources) {
            const resources: string[] = this.childrenOf(resource.identifier).map(
                (c: { name: string }) => c.name,
            );
            if (resources.length > 0) {
                const familyName = `${resource.identifier.name}Family`;
                families[familyName] = resources;
            }
        }
        return families;
    }
}
