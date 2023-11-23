import { test as base } from "@playwright/test";
import GaragePage from "../pageObjects/panel/garagePage/GaragePage.js";
import { STORAGE_STATE_USER_PATH } from "../data/storageState.js";

export const test = base.extend({
  headerLinks: ["Garage", "Fuel expenses", "Instructions"],
  GaragePage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: STORAGE_STATE_USER_PATH,
    });
    const page = await context.newPage();
    const garagePage = new GaragePage(page);
    await garagePage.navigate();
    await use(garagePage);
  },
});
