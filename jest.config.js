module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['tests'],
  testMatch: ['/**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
}; 