import {ResourceViewModel} from "@fscg/generators/mustache/types/ResourceViewModel";
import {FieldViewModel} from "@fscg/generators/mustache/types/FieldViewModel";
import {TypeViewModel} from "@fscg/generators/mustache/types/TypeViewModel";


export type ResourceWithParentsViewModel = ResourceViewModel & {
    allFields: FieldViewModel[];
    inheritedFields: FieldViewModel[];
    parents: TypeViewModel[];
}