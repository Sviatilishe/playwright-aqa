//C:\Autotests\playwright-aqa\src\pageObjects\panel\garagePage.js\GaragePage.js

import BasePage from "../../BasePage.js";

export default class GaragePage extends BasePage {
  constructor(page) {
    super(
      page,
      "/panel/garage",
      page.locator("app-panel-layout", {
        has: page.locator("button", { hasText: "Add car" }),
      }),
    );
  }
}
