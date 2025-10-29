import {NamedViewModel} from "@fscg/generators/mustache/types/NamedViewModel";
import {LambdaMixin} from "@fscg/generators/mustache/types/LambdaMixin";


export type View<T extends NamedViewModel> = LambdaMixin & {
    model: T,
    meta: {
        timestamp: string,
        generator: string,
    },
    properties: Record<string, unknown>
}