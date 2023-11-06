class BasePage {
  constructor(page) {
    this.page = page;
  }

  async waitForElement(selector) {
    await this.page.waitForSelector(selector);
  }

  async isLocatorDisabled(locator) {
    const isDisabled = await locator.evaluate((el) =>
      el.hasAttribute("disabled"),
    );
    return isDisabled;
  }
}

export { BasePage };
