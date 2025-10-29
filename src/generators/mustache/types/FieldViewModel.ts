import {ClassField} from "@fscg/typeschema";
import {PrimitiveType} from "@fscg/generators/mustache/types/PrimitiveType";
import {IsPrefixed} from "@fscg/generators/mustache/UtilityTypes";

export type FieldViewModel = {
    schema: ClassField;
    name: string;
    saveName: string;

    typeName: string;

    isPrimitive: Record<IsPrefixed<PrimitiveType>, boolean> | false;

    isSizeConstrained: boolean;
    min?: number;
    max?: number;

    isArray: boolean;
    isRequired: boolean;
    isEnum: boolean;

    isPrimitiveType: boolean;
    isComplexType: Record<IsPrefixed<string>, boolean> | false;
    isResource: Record<IsPrefixed<string>, boolean> | false;
    
    isCode: boolean;
    isIdentifier: boolean;
    isReference: boolean;
}