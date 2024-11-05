import { Resource } from "./Resource";
import { HumanName } from "./HumanName";

export class Patient extends Resource {
    name?: HumanName[];
}