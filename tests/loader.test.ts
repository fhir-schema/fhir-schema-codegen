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
        choices: [
         "multipleBirthBoolean",
         "multipleBirthInteger"
        ]
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



const patientTypeSchema: cg.ITypeSchema = {
  kind: "resource",
  name: {
    name: "Patient",
    package: "fhir.r4"
  },
  base: {
    name: "DomainResource",
    package: "fhir.r4"
  },
  allDependencies: [
    {
      name: "DomainResource",
      package: "fhir.r4",
      type: "resource"
    },
    {
      name: "boolean",
      package: "fhir.r4",
      type: "primitive-type"
    },
    {
      name: "HumanName",
      package: "fhir.r4",
      type: "complex-type"
    },
    {
      name: "code",
      package: "fhir.r4",
      type: "primitive-type"
    },
    {
      name: "administrative-gender",
      package: "fhir.r4",
      url: "http://hl7.org/fhir/ValueSet/administrative-gender",
      type: "valueset"
    },
    {
      name: "date",
      package: "fhir.r4",
      type: "primitive-type"
    },
    {
      name: "CodeableConcept",
      package: "fhir.r4",
      type: "complex-type"
    },
    {
      name: "marital-status",
      package: "fhir.r4",
      url: "http://hl7.org/fhir/ValueSet/marital-status",
      type: "valueset"
    },
    {
      name: "Attachment",
      package: "fhir.r4",
      type: "complex-type"
    },
    {
      name: "BackboneElement",
      package: "fhir.r4",
      type: "complex-type"
    },
    {
      name: "ContactPoint",
      package: "fhir.r4",
      type: "complex-type"
    },
    {
      name: "Address",
      package: "fhir.r4",
      type: "complex-type"
    },
    {
      name: "Reference",
      package: "fhir.r4",
      type: "complex-type"
    },
    {
      name: "Period",
      package: "fhir.r4",
      type: "complex-type"
    },
    {
      name: "PatientContact",
      package: "fhir.r4",
      type: "nested",
      parent: "Patient"
    }
  ],
  nestedTypes: [ {
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
          type: {
            name: "CodeableConcept",
            package: "fhir.r4",
            type: "complex-type"
          },
          array: true
        },
        name: {
          type: {
            name: "HumanName",
            package: "fhir.r4",
            type: "complex-type"
          }
        },
        telecom: {
          type: {
            name: "ContactPoint",
            package: "fhir.r4",
            type: "complex-type"
          },
          array: true
        },
        address: {
          type: {
            name: "Address",
            package: "fhir.r4",
            type: "complex-type"
          }
        },
        organization: {
          type: {
            name: "Reference",
            package: "fhir.r4",
            type: "complex-type"
          }
        },
        period: {
          type: {
            name: "Period",
            package: "fhir.r4",
            type: "complex-type"
          }
        }
      }
    }
  ],
  fields: {
    active: {
      type: {
        name: "boolean",
        package: "fhir.r4",
        type: "primitive-type"
      }
    },
    name: {
      type: {
        name: "HumanName",
        package: "fhir.r4",
        type: "complex-type"
      },
      array: true
    },
    gender: {
      type: {
        name: "code",
        package: "fhir.r4",
        type: "primitive-type"
      },
      binding: {
        valueSet: {
          name: "administrative-gender",
          package: "fhir.r4",
          url: "http://hl7.org/fhir/ValueSet/administrative-gender",
          type: "valueset"
        },
        strength: "required"
      }
    },
    birthDate: {
      type: {
        name: "date",
        package: "fhir.r4",
        type: "primitive-type"
      }
    },
    maritalStatus: {
      type: {
        name: "CodeableConcept",
        package: "fhir.r4",
        type: "complex-type"
      },
      binding: {
        valueSet: {
          name: "marital-status",
          package: "fhir.r4",
          url: "http://hl7.org/fhir/ValueSet/marital-status",
          type: "valueset"
        },
        strength: "extensible"
      }
    },
    photo: {
      type: {
        name: "Attachment",
        package: "fhir.r4",
        type: "complex-type"
      },
      array: true
    },
    contact: {
      type: {
        name: "PatientContact",
        package: "fhir.r4",
        type: "nested",
        parent: "Patient"
      },
      array: true
    },
    generalPractitioner: {
      type: {
        name: "Reference",
        package: "fhir.r4",
        type: "complex-type"
      },
      array: true
    },
    managingOrganization: {
      type: {
        name: "Reference",
        package: "fhir.r4",
        type: "complex-type"
      }
    }
  }
}

;
;


let questionnaireFHIRSchema: cg.FHIRSchema = {
  url: 'http://hl7.org/fhir/StructureDefinition/Questionnaire',
  name: 'Questionnaire',
  'package-meta': {
    name: 'hl7.fhir.r4.core',
    version: '4.0.1',
  },
  derivation: 'specialization',
  base: 'http://hl7.org/fhir/StructureDefinition/DomainResource',
  kind: 'resource',
  required: ['status'],
  elements: {
    status: { type: 'code' },
    item: {
      required: [ 'linkId' ],
      type: 'BackboneElement',
      array: true,
      elements: {
        text: { type: 'string' },
        linkId: { type: 'string' },
        item: {
          elementReference: [ 'http://hl7.org/fhir/StructureDefinition/Questionnaire', 'elements', 'item' ],
          array: true
        },
        enableWhen: {
          type: "BackboneElement",
          array: true,
          elements: {
            question: { scalar: true, type: "string" },
            answerDecimal: { scalar: true, type: "decimal" }
          }
        }
      }
    }
  }
}

let questionnaireTypeSchema: cg.ITypeSchema = {
  kind: "resource",
  name: { name: "Questionnaire", package: "hl7.fhir.r4.core" },
  base: { name: "DomainResource", package: "hl7.fhir.r4.core" },
  allDependencies: [
    { name: "DomainResource", package: "hl7.fhir.r4.core", type: "resource" },
    { name: "code", package: "hl7.fhir.r4.core", type: "primitive-type" },
    { name: "BackboneElement", package: "hl7.fhir.r4.core", type: "complex-type" },
    { name: "string", package: "hl7.fhir.r4.core", type: "primitive-type" },
    { name: "QuestionnaireItem", package: "hl7.fhir.r4.core", type: "nested" },
    { name: "decimal", package: "hl7.fhir.r4.core", type: "primitive-type" },
    { name: "QuestionnaireItemEnableWhen", package: "hl7.fhir.r4.core", type: "nested", parent: "Questionnaire" }
  ],
  nestedTypes: [
    {
      kind: "nested",
      name: { name: "QuestionnaireItemEnableWhen", package: "hl7.fhir.r4.core", parent: "Questionnaire" },
      base: { name: "BackboneElement", package: "hl7.fhir.r4.core" },
      fields: {
        question: {
          type: { name: "string", package: "hl7.fhir.r4.core", type: "primitive-type" }
        },
        answerDecimal: {
          type: { name: "decimal", package: "hl7.fhir.r4.core", type: "primitive-type" }
        }
      }
    },
    {
      kind: "nested", 
      name: { name: "QuestionnaireItem", package: "hl7.fhir.r4.core", parent: "Questionnaire" },
      base: { name: "BackboneElement", package: "hl7.fhir.r4.core" },
      fields: {
        linkId: {
          type: { name: "string", package: "hl7.fhir.r4.core", type: "primitive-type" },
          required: true
        },
        text: {
          type: { name: "string", package: "hl7.fhir.r4.core", type: "primitive-type" }
        },
        item: {
          type: { name: "QuestionnaireItem", package: "hl7.fhir.r4.core", type: "nested" },
          array: true
        },
        enableWhen: {
          type: { name: "QuestionnaireItemEnableWhen", package: "hl7.fhir.r4.core", type: "nested", parent: "Questionnaire" },
          array: true
        }
      }
    }
  ],
  fields: {
    status: {
      type: { name: "code", package: "hl7.fhir.r4.core", type: "primitive-type" },
      required: true
    },  
    item: {
      type: {
        name: "QuestionnaireItem",
        package: "hl7.fhir.r4.core",
        type: "nested",
        parent: "Questionnaire"
      },
      array: true
    }
  }
}

let observationFHIRSchema: cg.FHIRSchema = {
  url: "http://hl7.org/fhir/StructureDefinition/Observation",
  'package-meta': {
    name: "hl7.fhir.r4.core",
    version: "4.0.1",
    path: "/tmp/lw-fhir-schema-repository/hl7.fhir.r4.core#4.0.1"
  },
  id: "Observation",
  base: "http://hl7.org/fhir/StructureDefinition/DomainResource",
  name: "Observation",
  kind: "resource",
  type: "Observation",
  version: "4.0.1",
  derivation: "specialization",
  elements: {
    value: {
      choices: [
        "valueQuantity",
        "valueString",
      ],
      scalar: true
    },
    valueString: {
      scalar: true,
      summary: true,
      type: "string",
      choiceOf: "value"
    },
    valueQuantity: {
      summary: true,
      type: "Quantity",
      choiceOf: "value"
    }
  }
}

let observationTypeSchema: cg.ITypeSchema = {
  kind: "resource",
  name: { name: "Observation", package: "hl7.fhir.r4.core" },
  base: { name: "DomainResource", package: "hl7.fhir.r4.core" },
  allDependencies: [
    { name: "DomainResource", package: "hl7.fhir.r4.core", type: "resource" },
    { name: "string", package: "hl7.fhir.r4.core", type: "primitive-type" },
    { name: "Quantity", package: "hl7.fhir.r4.core", type: "complex-type" }
  ],
  choices: {
    value: {
      choices: [ "valueQuantity", "valueString" ]
    }
  },
  fields: {
    valueString: {
      type: { name: "string", package: "hl7.fhir.r4.core", type: "primitive-type" },
      choiceOf: "value"
    },
    valueQuantity: {
      type: { name: "Quantity", package: "hl7.fhir.r4.core", type: "complex-type" },
      choiceOf: "value"
    }
  }
}


describe('sch2class', () => {
  it('translate basic staf', () => {
    const result = cg.convert(patientFHIRSchema);
    // console.log(JSON.stringify(result, null, 2));
    expect(result).toMatchObject(patientTypeSchema);
  });
  it('translate recursive', () => {
    const result = cg.convert(questionnaireFHIRSchema);
    // console.log(JSON.stringify(result, null, 2));
    expect(result).toMatchObject(questionnaireTypeSchema);
  });
  it('translate polymorphic', () => {
    const result = cg.convert(observationFHIRSchema);
    // console.log(JSON.stringify(result, null, 2));
    expect(result).toMatchObject(observationTypeSchema);
  });
});


describe('loader', () => {
  it('...', async () => {
    let loader = new cg.SchemaLoader();
    await loader.loadFromURL("https://storage.googleapis.com/fhir-schema-registry/1.0.0/hl7.fhir.r4.core%234.0.1/package.ndjson.gz");

    let primitives = loader.primitives();
    loader.complexTypes()
    expect(loader.resources().length).toEqual(148);
    loader.resources().forEach((res) => {
      // console.log(res.name.name);
    });
    loader.valueSets()
  });
}); 

describe.only('lookup', () => {
  it.only('read_ndjson_gz', async () => {
    let loader = new cg.SchemaLoader();
    await loader.packageLookup('hl7.fhir');
  });
}); 