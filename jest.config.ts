import type { Config } from 'jest'

const config: Config = {
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    html: '<html lang="zh-cmn-Hant"></html>',
    url: 'https://jestjs.io/',
    userAgent: 'Agent/007'
  },
  preset: 'ts-jest',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  },
  transformIgnorePatterns: [],
  moduleNameMapper: {
    '^@solidjs/router$': '<rootDir>/node_modules/@solidjs/router/dist/index.js',
    '\\.scss$': '<rootDir>/__mocks__/styleMock.ts'
  }
}

export default config
