import { Client } from './aidbox';
import { Patient } from './aidbox/types/hl7-fhir-r4-core';

async function main() {
  const client = new Client('http://localhost:8888', {
    auth: {
      method: 'basic',
      credentials: {
        username: 'root',
        password: 'secret',
      },
    },
  });

  const patient: Patient = {
    identifier: [{ system: 'http://org.io/id', value: '0000-0000' }],
    name: [{ given: ['John'], family: 'Doe' }],
    gender: 'male',
    birthDate: '1990-01-01',
  };

  const response = await client.resource.create('Patient', patient);

  console.log(response);
}

main().catch(console.error);
