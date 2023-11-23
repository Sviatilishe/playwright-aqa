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
    this.header = page.locator(
      "div.panel-page_heading.d-flex.justify-content-between > h1",
    );
  }
}
