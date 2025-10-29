import {FieldViewModel} from "@fscg/generators/mustache/types/FieldViewModel";
import {ComplexTypeViewModel} from "@fscg/generators/mustache/types/ComplexTypeViewModel";
import {TypeViewModel} from "@fscg/generators/mustache/types/TypeViewModel";

export type ComplexTypeWithParentsViewModel = ComplexTypeViewModel & {
    allFields: FieldViewModel[];
    inheritedFields: FieldViewModel[];
    parents: TypeViewModel[];
}