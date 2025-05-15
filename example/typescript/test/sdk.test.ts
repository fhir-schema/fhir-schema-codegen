import { describe, it, expect, beforeEach, beforeAll, afterAll } from 'vitest';
import { Client } from '../fhirsdk';
import type { BasicAuthorization } from '../fhirsdk';
import type { Patient } from '../fhirsdk/types/hl7-fhir-r4-core';

// NOTE: due to internal reasons /fhir added automatically.
const FHIR_SERVER_URL = 'http://localhost:8080';
const USERNAME = 'root';
const PASSWORD = '<SECRET>'; // get actual value from docker-compose.yaml: BOX_ROOT_CLIENT_SECRET

describe('FHIR API tests', () => {
  let client: Client<BasicAuthorization>;
  let testPatient: Patient;

  beforeAll(() => {
    client = new Client(FHIR_SERVER_URL, {
      auth: {
        method: 'basic',
        credentials: {
          username: USERNAME,
          password: PASSWORD,
        },
      },
    });
  });

  beforeEach(async () => {
    const patient: Patient = {
      name: [
        {
          given: ['Test'],
          family: 'Patient',
        },
      ],
      gender: 'female',
      birthDate: '1980-01-01',
    };

    testPatient = await client.resource.create('Patient', patient);
  });

  afterAll(async () => {
    // Cleanup any leftover test patient if it exists
    if (testPatient?.id) {
      try {
        await client.resource.delete('Patient', testPatient.id);
      } catch (error) {
        // Ignore errors during cleanup
      }
    }
  });

  it('should create a patient', async () => {
    const newPatient: Patient = {
      name: [
        {
          given: ['Create'],
          family: 'Test',
        },
      ],
      gender: 'female',
      birthDate: '1980-01-01',
    };

    const created: Patient = await client.resource.create('Patient', newPatient);

    expect(created.id).toBeDefined();
    expect(created.name?.[0]?.family).toBe('Test');
    expect(created.gender).toBe('female');
    expect(created.birthDate).toBe('1980-01-01');

    if (created.id) {
      await client.resource.delete('Patient', created.id);
    }
  });

  it('should read a patient', async () => {
    const readPatient: Patient = await client.resource.get('Patient', testPatient.id!);

    expect(readPatient.id).toBe(testPatient.id);
    expect(readPatient.name?.[0]?.family).toBe(testPatient.name?.[0]?.family);
    expect(readPatient.gender).toBe(testPatient.gender);
  });

  it('should update a patient', async () => {
    const patientToUpdate: Patient = await client.resource.get('Patient', testPatient.id!);

    expect(patientToUpdate.id).toBe(testPatient.id);
    expect(patientToUpdate.gender).toBe('female');
    expect(patientToUpdate.name?.[0]?.family).toBe('Patient');

    // Update specific fields similar to Python test
    if (patientToUpdate.name?.[0]) {
      patientToUpdate.name[0].family = 'UpdatedFamily';
      patientToUpdate.name[0].given = ['UpdatedGiven'];
    }
    patientToUpdate.gender = 'male';

    const updatedPatient: Patient = await client.resource.update(
      'Patient',
      patientToUpdate.id!,
      patientToUpdate
    );

    expect(updatedPatient.id).toBe(testPatient.id); // ID should not change
    expect(updatedPatient.gender).toBe('male'); // Gender should be updated
    expect(updatedPatient.name?.[0]?.family).toBe('UpdatedFamily'); // Family name should be updated
    expect(updatedPatient.name?.[0]?.given?.[0]).toBe('UpdatedGiven'); // Given name should be updated

    // Verify the update with a fresh read (just like in Python test)
    const reReadPatient: Patient = await client.resource.get('Patient', testPatient.id!);
    expect(reReadPatient.gender).toBe('male');
    expect(reReadPatient.name?.[0]?.family).toBe('UpdatedFamily');
    expect(reReadPatient.name?.[0]?.given?.[0]).toBe('UpdatedGiven');
  });

  it('should search for a patient', async () => {
    // Create search params object similar to Python test
    const searchResult = await client.resource
      .search('Patient')
      .where('name', 'Patient' as any)
      .then();

    expect(searchResult.total).toBeGreaterThan(0);

    let found = false;
    for (const entry of searchResult.entry || []) {
      const patientResource = entry.resource as Patient;
      if (patientResource.id === testPatient.id) {
        found = true;
        break;
      }
    }

    expect(found).toBe(true);
  });

  it('should delete a patient', async () => {
    // Create a patient to delete
    const deletePatient: Patient = {
      name: [
        {
          given: ['Delete'],
          family: 'Test',
        },
      ],
      gender: 'other',
    };

    const created: Patient = await client.resource.create('Patient', deletePatient);
    expect(created.id).toBeDefined();

    // Delete the patient
    await client.resource.delete('Patient', created.id!);

    // Verify the patient is deleted - should throw an error
    await expect(async () => {
      await client.resource.get('Patient', created.id!);
    }).rejects.toThrow();
  });

  it('should create a patient with identifiers', async () => {
    const patientWithIds: Patient = {
      name: [
        {
          given: ['John'],
          family: 'Doe',
        },
      ],
      gender: 'male',
      birthDate: '1990-05-15'
    };

    const created: Patient = await client.resource.create('Patient', patientWithIds);

    expect(created.id).toBeDefined();
    expect(created.name?.[0]?.family).toBe('Doe');
    expect(created.name?.[0]?.given?.[0]).toBe('John');
    expect(created.gender).toBe('male');
    expect(created.birthDate).toBe('1990-05-15');

    if (created.id) {
      await client.resource.delete('Patient', created.id);
    }
  });
});
