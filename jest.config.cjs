const { createDefaultEsmPreset } = require("ts-jest");

const tsJestPreset = createDefaultEsmPreset();

/** @type {import("jest").Config} */
module.exports = {
  ...tsJestPreset,
  testEnvironment: "node",
  testMatch: ["**/src/tests/**/*.test.ts"],
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  globals: {
    "ts-jest": {
      useESM: true,
      tsconfig: "tsconfig.json",
    },
  },
};
