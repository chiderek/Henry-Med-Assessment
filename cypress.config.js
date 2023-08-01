const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.spec.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://onboard.henrymeds.com/",
    experimentalRunAllSpecs: true,
    retries: 0,
  },
});
