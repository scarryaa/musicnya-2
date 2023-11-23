import type { Config } from 'jest'

const config: Config = {
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    html: '<html lang="zh-cmn-Hant"></html>',
    url: 'https://jestjs.io/',
    userAgent: 'Agent/007'
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '@swc/jest'
  },
  moduleNameMapper: {
    '^@solidjs/router$': '<rootDir>/node_modules/@solidjs/router/dist/index.js'
  }
}

export default config
