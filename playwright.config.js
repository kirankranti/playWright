// @ts-check
const { devices } = require('@playwright/test');

const config = {

  testDir: './tests',
  /* Run tests in files in parallel */
  timeout: 50 * 1000,

  expect: {

  timeout: 5000,
},
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    trace: 'retain-on-failure',
  },

 
};

module.exports = config;