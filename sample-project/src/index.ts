import { Patient } from "./fhir.r4/Patient";

let pt: Patient = new Patient();

pt.name = [{
    given: ["John"],
    family: "Doe",
}];