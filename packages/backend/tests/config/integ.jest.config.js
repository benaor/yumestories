/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  rootDir: "../..",
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>**/tests/**/*.integ.(ts)"],
  modulePaths: ["<rootDir>"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "<rootDir>/tests/**/*.ts",
    "!<rootDir>/tests/**/*.test.ts",
    "!<rootDir>/tests/**/*.integ.ts",
    "!<rootDir>/tests/**/*.e2e.ts",
  ],
};
