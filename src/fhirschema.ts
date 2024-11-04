export interface Element {
    type: string;
    array?: boolean;
    elements?: { [key: string]: Element };
}

export interface FHIRSchema {
    kind: 'resource' | 'complex-type' | 'primitive';
    name: string;
    package: string;
    elements: { [key: string]: Element };
}