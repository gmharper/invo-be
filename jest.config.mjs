import { defineConfig } from 'jest';

export default defineConfig({
  setupFilesAfterEnv: ['./testData/setup.mjs'],
  testMatch: [
    //"**/__tests__/**"
    //"**/__tests__/dashboardTabs/*",
    //"**/__tests__/users/*",
    //"**/__tests__/inventories/*",
    //"**/__tests__/items/*",
    //"**/__tests__/machines/*",
    "**/__tests__/workflows/*",
    //"**/__tests__/comments/*",
    //"**/__tests__/history/*",
    //"**/__tests__/userPreferences/*",
    //"**/__tests__/routes/**/*.test.[jt]s?(x)"
  ],
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
  extensionsToTreatAsEsm: [], // optional but recommended
});