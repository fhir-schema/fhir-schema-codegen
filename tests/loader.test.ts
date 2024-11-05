import * as cg from '../src/loader';

const patientFHIRSchema: cg.FHIRSchema = {
    url: 'http://hl7.org/fhir/StructureDefinition/Patient',
    base: "http://hl7.org/fhir/StructureDefinition/DomainResource",
    'package-meta': {
        name: 'fhir.r4',
        version: '4.0.1',
        path: 'http://hl7.org/fhir/R4'
    },
    name: 'Patient',
    kind: 'resource',
    elements: {
      active: { type: 'boolean', scalar: true },
      name:   { type: 'HumanName', array: true },
      gender: { 
        type: 'code', 
        scalar: true,
        binding: {
          valueSet: 'http://hl7.org/fhir/ValueSet/administrative-gender',
          strength: 'required'
        }
      },
      birthDate: { type: 'date', scalar: true },
      multipleBirth: {
        type: 'choice',
        choices: {
          multipleBirthBoolean: { type: 'boolean' },
          multipleBirthInteger: { type: 'integer' }
        }
      },
      maritalStatus: {
        type: 'CodeableConcept',
        scalar: true,
        binding: {
          valueSet: 'http://hl7.org/fhir/ValueSet/marital-status',
          strength: 'extensible'
        }
      },
      photo: { type: 'Attachment', array: true },
      contact: {
        type: 'BackboneElement',
        array: true,
        elements: {
          relationship: { type: 'CodeableConcept', array: true },
          name: { type: 'HumanName', scalar: true },
          telecom: { type: 'ContactPoint', array: true },
          address: { type: 'Address', scalar: true },
          gender: { type: 'code', scalar: true },
          organization: { 
            type: 'Reference',
            scalar: true,
            refers: ['Organization']
          },
          period: { type: 'Period', scalar: true }
        }
      },
      generalPractitioner: {
        type: 'Reference',
        array: true,
        refers: ['Organization', 'Practitioner', 'PractitionerRole']
      },
      managingOrganization: {
        type: 'Reference',
        scalar: true,
        refers: ['Organization']
      }
    }
  };


const patientTypeSchema: cg.TypeSchema = {
    kind: "resource",
    name: {
      name: "Patient",
      package: "fhir.r4"
    },
    base: {
      name: "DomainResource",
      package: "fhir.r4"
    },
    nestedTypes: [
      {
        kind: "nested",
        name: {
          name: "PatientContact",
          package: "fhir.r4",
          parent: "Patient"
        },
        base: {
          name: "BackboneElement",
          package: "fhir.r4"
        },
        fields: {
          relationship: {
            type: { name: "CodeableConcept", package: "fhir.r4" },
            array: true
          },
          name: {
            type: { name: "HumanName", package: "fhir.r4" }
          },
          telecom: {
            type: { name: "ContactPoint", package: "fhir.r4" },
            array: true
          },
          address: {
            type: { name: "Address", package: "fhir.r4" }
          },
          gender: {
            type: { name: "code", package: "fhir.r4" }
          },
          organization: {
            type: { name: "Reference", package: "fhir.r4" }
          },
          period: {
            type: { name: "Period", package: "fhir.r4" }
          }
        }
      }
    ],
    fields: {
      active: {
        type: { name: "boolean", package: "fhir.r4" }
      },
      name: {
        type: { name: "HumanName", package: "fhir.r4" },
        array: true
      },
      gender: {
        type: { name: "code", package: "fhir.r4" }
      },
      birthDate: {
        type: { name: "date", package: "fhir.r4" }
      },
      multipleBirth: {
        type: { name: "choice", package: "fhir.r4" }
      },
      maritalStatus: {
        type: { name: "CodeableConcept", package: "fhir.r4" }
      },
      photo: {
        type: { name: "Attachment", package: "fhir.r4" },
        array: true
      },
      contact: {
        type: { name: "PatientContact", package: "fhir.r4", parent: "Patient" },
        array: true
      },
      generalPractitioner: {
        type: { name: "Reference", package: "fhir.r4" },
        array: true
      },
      managingOrganization: {
        type: { name: "Reference", package: "fhir.r4" }
      }
    }
 };
;


describe('sch2class', () => {
    it('...', () => {
        const result = cg.convert(patientFHIRSchema);
        console.log(JSON.stringify(result, null, 2));
        expect(result).toEqual(patientTypeSchema);
    });
}); 


describe('loader', () => {
    it('...', async () => {
        let loader = new cg.SchemaLoader();
        await loader.loadFromURL("https://storage.googleapis.com/fhir-schema-registry/1.0.0/hl7.fhir.r4.core%234.0.1/package.ndjson.gz");

        let primitives = loader.primitives();
        console.log(primitives.length);
    });
}); 