const { defaults } = require('jest-config')

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'libs/data/src/**/*.ts',
    '!libs/data/src/index.ts',
    '!libs/data/src/**/model.ts',
    '!libs/data/src/**/*.module.ts',
    '!libs/data/src/**/*.stories.ts',
  ],
}
