export interface FHIRSchemaElement {
    scalar?: boolean;
    summary?: boolean;
    type: string;
    array?: boolean;
    modifier?: boolean;
    refers?: string[];
    binding?: {
        valueSet: string;
        strength: 'example' | 'extensible' | 'required' | 'preferred';
    };
    constraints?: {
        [key: string]: {
            human: string;
            severity: 'error' | string;
            expression: string;
        }
    };
    choices?: {
        [key: string]: FHIRSchemaElement
    };  
    required?: string[];
    elements?: {
        [key: string]: FHIRSchemaElement
    }
}

export type FHIRSchemaKind = 'resource' | 'complex-type' | 'primitive-type' | 'logical';


export interface FHIRSchema {
    url: string;
    constraints?: {
        [key: string]: {
            human: string;
            severity: 'error' | string;
            expression: string;
        }
    };
    'package-meta': {
        name: string;
        version: string;
        path: string;
    };
    id?: string;
    base?: string;
    name: string;
    kind: FHIRSchemaKind;
    derivation?: 'specialization' | 'constraint';
    type?: string;
    version?: string;
    required?: string[];
    elements: {
        [key: string]: FHIRSchemaElement
    };
}