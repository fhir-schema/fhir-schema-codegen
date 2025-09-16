import type { TypeRef, TypeSchema } from '../typeschema';
import type { Generator } from './generator';
import { SchemaLoader } from '../loader';

export interface Relative {
    parent: TypeRef;
    child: TypeRef;
}

export const resourceRelatives = (loader: SchemaLoader): Relative[] => {
    const resources = loader.resources();
    const directPairs: Relative[] = [];

    for (const schema of resources) {
        if (schema.base) {
            directPairs.push({ parent: schema.base, child: schema.identifier });
        }
    }

    const allPairs: Relative[] = [...directPairs];
    const findTransitiveRelatives = (parentRef: TypeRef): TypeRef[] => {
        const directChildren = directPairs
            .filter((pair) => pair.parent.name === parentRef.name)
            .map((pair) => pair.child);

        const transitiveChildren: TypeRef[] = [];
        for (const child of directChildren) {
            transitiveChildren.push(...findTransitiveRelatives(child));
        }

        return [...directChildren, ...transitiveChildren];
    };

    for (const pair of directPairs) {
        const transitiveChildren = findTransitiveRelatives(pair.child);
        for (const transitiveChild of transitiveChildren) {
            if (
                !directPairs.some(
                    (dp) =>
                        dp.parent.name === pair.parent.name &&
                        dp.child.name === transitiveChild.name,
                )
            ) {
                allPairs.push({ parent: pair.parent, child: transitiveChild });
            }
        }
    }

    return allPairs;
};

export const resourceChildren = (relatives: Relative[], id: TypeRef): TypeRef[] => {
    return relatives
        .filter((relative) => relative.parent.name === id.name)
        .map((relative) => relative.child);
};

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
