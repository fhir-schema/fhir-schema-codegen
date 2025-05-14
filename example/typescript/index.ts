import { Client } from './fhirsdk';
import { Patient } from './fhirsdk/types/hl7-fhir-r4-core';
import { logger } from '../../src/logger';

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

  logger.info(JSON.stringify(response, null, 2));
}

main().catch((error) => logger.error(error instanceof Error ? error.message : String(error)));
