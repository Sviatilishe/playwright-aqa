import BaseComponent from "../../BaseComponent.js";
import { expect } from "@playwright/test";

export default class SignUpPopup extends BaseComponent {
  _nameInputSelector = "#signupName";
  _lastNameInputSelector = "#signupLastName";
  _emailInputSelector = "#signupEmail";
  _passwordInputSelector = "#signupPassword";
  _rePasswordInputSelector = "#signupRepeatPassword";
  _errorMessageSelector = "div.invalid-feedback";

  constructor(page) {
    super(page, page.locator("app-signup-modal"));
    this.nameInput = this._container.locator(this._nameInputSelector);
    this.lastNameInput = this._container.locator(this._lastNameInputSelector);
    this.emailInput = this._container.locator(this._emailInputSelector);
    this.passwordInput = this._container.locator(this._passwordInputSelector);
    this.rePasswordInput = this._container.locator(
      this._rePasswordInputSelector,
    );
    this.footerButton = this._container.locator("div.modal-footer");
    this.signUpButton = this._container.locator(".btn-primary");
    this.nameInputError = this._container.locator(
      `${this._nameInputSelector} + ${this._errorMessageSelector}`,
    );
    this.lastNameInputError = this._container.locator(
      `${this._lastNameInputSelector} + ${this._errorMessageSelector}`,
    );
    this.emailInputError = this._container.locator(
      `${this._emailInputSelector} + ${this._errorMessageSelector}`,
    );
    this.passwordInputError = this._container.locator(
      `${this._passwordInputSelector} + ${this._errorMessageSelector}`,
    );
    this.rePasswordInputError = this._container.locator(
      `${this._rePasswordInputSelector} + ${this._errorMessageSelector}`,
    );

    this.alertMessage = this._container.locator(".alert-danger");
  }

  async fill(signUpData) {
    await this.nameInput.fill(signUpData.name);
    await this.lastNameInput.fill(signUpData.lastName);
    await this.emailInput.fill(signUpData.email);
    await this.passwordInput.fill(signUpData.password);
    await this.rePasswordInput.fill(signUpData.rePassword);
    await this.footerButton.click();
  }

  async registerNewUser(signUpData) {
    await this.fill(signUpData);
    await this.signUpButton.click();
    await expect(this._page).toHaveURL(/panel\/garage/);
  }
}
