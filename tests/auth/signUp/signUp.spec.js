// C:\Autotests\playwright-aqa\tests\auth\signUp\signUp.spec.js

import { expect, test } from "@playwright/test";
import WelcomePage from "../../../src/pageObjects/welcomePage/WelcomePage.js";
import StringUtils from "../../../src/Utils/StringUtils.js";
import { USERS } from "../../../src/data/dict/users.js";
import { generateRandomEmail } from "../../../src/Utils/helpers.js";

test.describe("Auth", () => {
  let page;
  let welcomePage;
  let signUpPopup;

  const password = `Pas1${StringUtils.randomString()}`;
  const baseSignUpData = {
    name: "Saul",
    lastName: "Goodman",
    email: generateRandomEmail(),
    password,
    rePassword: password,
  };

  test.beforeAll(async ({ browser }) => {
    const ctx = await browser.newContext();
    page = await ctx.newPage();
    welcomePage = new WelcomePage(page);
  });

  test.beforeEach(async () => {
    await welcomePage.navigate();
    signUpPopup = await welcomePage.openSignUpPopup();
  });

  test.describe("Name validation", () => {
    test("should show error message if name is empty", async () => {
      const signUpData = {
        ...baseSignUpData,
        name: "",
      };

      await signUpPopup.fill(signUpData);
      await expect(
        signUpPopup.nameInputError,
        "Error message should be valid",
      ).toHaveText("Name required");
    });

    test("should show error message if name is invalid", async () => {
      const signUpData = {
        ...baseSignUpData,
        name: "Сол",
      };

      await signUpPopup.fill(signUpData);
      await expect(
        signUpPopup.nameInputError,
        "Error message should be valid",
      ).toHaveText("Name is invalid");
    });

    test("should display error message if name length is more than 20 characters", async () => {
      const signUpData = {
        ...baseSignUpData,
        name: "steeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeve",
      };

      await signUpPopup.fill(signUpData);
      await expect(
        signUpPopup.nameInputError,
        "Error message should be valid",
      ).toHaveText("Name has to be from 2 to 20 characters long");
    });
  });

  test.describe("Inputs validation", () => {
    test("should display error message if required inputs are empty", async () => {
      const signUpData = {
        ...baseSignUpData,
        name: "",
        lastName: "",
        email: "",
        password: "",
        rePassword: "",
      };

      await signUpPopup.fill(signUpData);
      await expect(
        signUpPopup.nameInputError,
        "Error message should be displayed",
      ).toHaveText("Name required");
      await expect(
        signUpPopup.lastNameInputError,
        "Error message should be displayed",
      ).toHaveText("Last name required");
      await expect(
        signUpPopup.emailInputError,
        "Error message should be valid",
      ).toHaveText("Email required");
      await expect(
        signUpPopup.passwordInputError,
        "Error message should be displayed",
      ).toHaveText("Password required");
      await expect(
        signUpPopup.rePasswordInputError,
        "Error message should be displayed",
      ).toHaveText("Re-enter password required");
    });

    test("should show error message if email has wrong format", async () => {
      const signUpData = {
        ...baseSignUpData,
        email: "Укр@пошта.юа",
      };

      await signUpPopup.fill(signUpData);
      await expect(
        signUpPopup.emailInputError,
        "Error message should be valid",
      ).toHaveText("Email is incorrect");
    });

    test("should notify if user already exists", async () => {
      const signUpData = {
        ...baseSignUpData,
        email: USERS.JD.email,
      };

      await signUpPopup.fill(signUpData);
      await signUpPopup.signUpButton.click();
      await expect(
        signUpPopup.alertMessage,
        "Error message should be valid",
      ).toHaveText("User already exists");
    });
  });

  test.describe("Successful registration", () => {
    test("should register new user", async () => {
      await signUpPopup.registerNewUser(baseSignUpData);
      // Todo check name in profile
    });
  });
});
