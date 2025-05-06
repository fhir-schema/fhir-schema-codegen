import { words, kebabCase, snakeCase, camelCase, pascalCase } from '../src/utils/code';

describe('String utils', () => {
    afterEach(() => {});

    test('words', async () => {
        expect(words('kebab-case')).toEqual(['kebab', 'case']);
        expect(words('snake-case')).toEqual(['snake', 'case']);
        expect(words('camelCase')).toEqual(['camel', 'Case']);
        expect(words('PascalCase')).toEqual(['Pascal', 'Case']);

        expect(words('Pas_cal-CaSe')).toEqual(['Pas', 'cal', 'Ca', 'Se']);
    });

    test('to camelCase', async () => {
        expect(camelCase('kebab-case')).toEqual('kebabCase');
        expect(camelCase('snake-case')).toEqual('snakeCase');
        expect(camelCase('camelCase')).toEqual('camelCase');
        expect(camelCase('PascalCase')).toEqual('pascalCase');

        expect(camelCase('Pas_cal-CaSe')).toEqual('pasCalCaSe');
    });

    test('to keb-case', async () => {
        expect(kebabCase('kebab-case')).toEqual('kebab-case');
        expect(kebabCase('snake-case')).toEqual('snake-case');
        expect(kebabCase('camelCase')).toEqual('camel-case');
        expect(kebabCase('PascalCase')).toEqual('pascal-case');

        expect(kebabCase('Pas_cal-CaSe')).toEqual('pas-cal-ca-se');
    });

    test('to sne_case', async () => {
        expect(snakeCase('kebab-case')).toEqual('kebab_case');
        expect(snakeCase('snake-case')).toEqual('snake_case');
        expect(snakeCase('camelCase')).toEqual('camel_case');
        expect(snakeCase('PascalCase')).toEqual('pascal_case');

        expect(snakeCase('Pas_cal-CaSe')).toEqual('pas_cal_ca_se');
    });

    test('to PaalCase', async () => {
        expect(pascalCase('kebab-case')).toEqual('KebabCase');
        expect(pascalCase('snake-case')).toEqual('SnakeCase');
        expect(pascalCase('camelCase')).toEqual('CamelCase');
        expect(pascalCase('PascalCase')).toEqual('PascalCase');

        expect(pascalCase('Pas_cal-CaSe')).toEqual('PasCalCaSe');
    });
});
