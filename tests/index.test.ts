import * as cg from '../src/index';

describe('ups', () => {
    it('should return hello message with the provided name', () => {
        const result = cg.test('hello');
        expect(result).toBe('hello');
    });
}); 


const schema: cg.Schema = {
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


console.log(schema);