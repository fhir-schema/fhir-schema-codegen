import {ViewModel} from "@fscg/generators/mustache/types/ViewModel";

export type NamedViewModel = ViewModel & {
    name: string;
    saveName: string;
}