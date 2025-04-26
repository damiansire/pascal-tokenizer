// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.ts", "**/?(*.)+(spec|test).ts"], // Patrones para encontrar archivos de test
};
