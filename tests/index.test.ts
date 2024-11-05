import * as cg from '../src/index';

const fschema: cg.FHIRSchema = {
    kind: 'resource',
    name: 'Patient',
    package: 'fhir.r4',
    elements: {
        name: { type: 'NumanName' }
    }
}


const cschema: cg.TypeSchema = {
    kind: 'resource',
    name: 'Patient',
    package: 'fhir.r4',
    base: {
        name: 'Resource',
        package: 'fhir.r4'
    },
    elements: {
        name: {
            array: true,
            type: {
                name: 'HumanName',
                package: 'fhir.r4'
            }
        }
    }
};

describe('sch2class', () => {

    it('...', () => {
        const result = cg.schema2classes(fschema);
        expect(true).toBe(true);
        console.log(cschema);
    });
}); 
