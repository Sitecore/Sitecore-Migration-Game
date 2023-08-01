import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000',
    retries: {
      runMode: 3,
    },
  },
  viewportHeight: 768,
  viewportWidth: 1400,
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
});
