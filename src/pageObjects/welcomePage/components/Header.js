import BaseComponent from "../../BaseComponent.js";
import { expect } from "@playwright/test";

export default class Header extends BaseComponent {
  _headerLinkSelector = ".header-link";

  constructor(page) {
    super(page, page.locator("app-header"));
    this.guestLoginButton = this._container.locator(this._headerLinkSelector, {
      hasText: "Guest log in",
    });
  }

  async getLinksText() {
    const links = this._container.locator(".header-link");
    const result = [];
    for (const linkItem of await links.all()) {
      const text = await linkItem.innerText();
      result.push(text);
    }

    return result;
  }

  async verifyLinksText(links) {
    const actualText = await this.getLinksText();
    expect(actualText, "All required links should be present").toEqual(links);
  }
}
