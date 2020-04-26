module.exports = {
  // The root of your source code, typically /src
  // `<rootDir>` is a token Jest substitutes
  roots: ['<rootDir>/src'],

  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '\\.(css|less|scss)$': './src/test/stub-transformer.ts',
  },

  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  // setupFilesAfterEnv: ['@testing-library/react/cleanup-after-each', '@testing-library/jest-dom/extend-expect'],

  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',

  // Module file extensions for importing
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  coverageReporters: ['json', 'lcov', 'text', 'clover', 'html'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.{test,stories}.{ts,tsx}',
    '!src/index.ts',
    '!src/store/devtools.ts',
    '!src/**/*.d.ts',
    '!src/test/*',
    '!<rootDir>/node_modules/',
    '!<rootDir>/config/',
  ],
  setupFilesAfterEnv: ['./src/jest.setup.ts'],
};
