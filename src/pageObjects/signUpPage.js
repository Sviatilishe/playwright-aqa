class SignUpPage {
  constructor(page) {
    this.page = page;
    this.modalSelector = "app-signup-modal";
    this.registerButtonSelector = "div.modal-footer > button";
    this.errorSelector = ".alert.alert-danger";
  }

  async openSignUpModal() {
    await this.page.goto("/");
    await this.page.click("text=Sign Up");
    await this.page.waitForSelector(this.modalSelector);
  }

  async signUpUser(signupData) {
    for (const [input, value] of Object.entries(signupData)) {
      await this.page.fill(`input#${input}`, value);
    }
    await this.clickRegisterButton();
  }

  async clickRegisterButton() {
    const registerButton = await this.page.locator(this.registerButtonSelector);
    const isButtonEnabled = await registerButton.isEnabled();
    if (isButtonEnabled) {
      await registerButton.click();
    } else {
      console.warn("Warning: Register button is disabled");
    }
  }

  async waitForUserNavDropdown() {
    await this.page.waitForSelector("#userNavDropdown");
  }

  async waitForExistingUserError() {
    await this.page.waitForSelector(this.errorSelector);
  }

  async getExistingUserErrorText() {
    return await this.page.textContent(this.errorSelector);
  }

  async waitForInputErrors(inputErrorSelectors) {
    for (const { input } of inputErrorSelectors) {
      await this.page.click(input);
    }

    await this.page.click("div.modal-footer");

    for (const { error } of inputErrorSelectors) {
      await this.page.waitForSelector(
        `.invalid-feedback:has-text("${error}")`,
        {
          timeout: 5000,
        },
      );
    }
  }

  async isRegisterButtonDisabled() {
    return await this.page
      .locator(`${this.registerButtonSelector}[disabled]`)
      .evaluate((button) => button !== null);
  }
}

export default SignUpPage;
