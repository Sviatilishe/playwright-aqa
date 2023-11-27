const { defineConfig, devices } = require("@playwright/test");
const dotenv = require("dotenv");
dotenv.config();

module.exports = defineConfig({
  testDir: "./tests",
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    headless: false,
    httpCredentials: {
      username: process.env.HTTP_CREDENTIALS_USERNAME,
      password: process.env.HTTP_CREDENTIALS_PASSWORD,
    },
    baseURL: process.env.BASE_URL,
    apiURL: process.env.API_URL,
    trace: "on-first-retry",
    launchOptions: {
      // slowMo: 1000
    },
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
