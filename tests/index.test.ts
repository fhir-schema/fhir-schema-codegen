import * as cg from '../src/index';


const schema: cg.ClassSchema = {
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
        const result = cg.schema2classes(schema);
        expect(result).toBe({});
        console.log(schema);
    });
}); 
