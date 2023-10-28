const { devices } = require("@playwright/test");

module.exports = async function () {
  global.browser = await devices["Desktop Chrome"].launch();
};
