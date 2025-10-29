import {NamedViewModel} from "@fscg/generators/mustache/types/NamedViewModel";
import {NestedTypeSchema, TypeSchema} from "@fscg/typeschema";
import {FieldViewModel} from "@fscg/generators/mustache/types/FieldViewModel";
import {ComplexTypeWithParentsViewModel} from "@fscg/generators/mustache/types/ComplexTypeWithParentsViewModel";
import {EnumViewModel} from "@fscg/generators/mustache/types/EnumViewModel";
import {IsPrefixed} from "@fscg/generators/mustache/UtilityTypes";

export type TypeViewModel = NamedViewModel & {
    schema: TypeSchema | NestedTypeSchema;
    fields: FieldViewModel[];

    isNested: boolean;
    isComplexType: Record<IsPrefixed<string>, boolean> | false;
    isResource: Record<IsPrefixed<string>, boolean> | false;

    nestedComplexTypes: ComplexTypeWithParentsViewModel[];
    nestedEnums: EnumViewModel[];
}