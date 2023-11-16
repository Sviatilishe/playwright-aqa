import { expect, test } from "@playwright/test";
import { SignUpPage } from "../../src/pageObjects/signUpPage.js";
import { generateRandomString } from "../../src/helpers/utils.js";

test.describe("SignUp Tests @smoke", () => {
  const commonSignUpSteps = async (signUpPage, signupData) => {
    await signUpPage.openSignUpModal();
    await signUpPage.signUpUser(signupData);
  };

  const signUpTest = async (page, signupData, expectedUrl) => {
    const signUpPage = new SignUpPage(page);
    await commonSignUpSteps(signUpPage, signupData);

    if (expectedUrl) {
      await signUpPage.waitForUserNavDropdown();
      expect(page.url()).toContain(expectedUrl);
    } else {
      await signUpPage.waitForExistingUserError();
      expect(await signUpPage.getExistingUserErrorText()).toContain(
        "User already exists",
      );
    }
  };

  test.beforeEach(async ({ page }) => {
    await page.goto("");
  });

  test("Sign up a new user", async ({ page }) => {
    const signupData = {
      signupName: "Auto",
      signupLastName: "Test",
      signupEmail: `aqa_${generateRandomString()}@example.com`,
      signupPassword: "Password10",
      signupRepeatPassword: "Password10",
    };

    const signUpPage = new SignUpPage(page);
    await commonSignUpSteps(signUpPage, signupData);
    await signUpPage.waitForUserNavDropdown();

    expect(page.url()).toContain("/panel/garage");
  });

  test("Sign up an existing user", async ({ page }) => {
    const signupData = {
      signupName: "Auto",
      signupLastName: "Test",
      signupEmail: "aqa@example.com",
      signupPassword: "Password10",
      signupRepeatPassword: "Password10",
    };

    await signUpTest(page, signupData);
  });

  test("Sign up when required inputs are empty", async ({ page }) => {
    const signUpPage = new SignUpPage(page);
    await signUpPage.openSignUpModal();
    const inputErrorSelectors = [
      { input: "input#signupName", error: "Name required" },
      { input: "input#signupLastName", error: "Last name required" },
      { input: "input#signupEmail", error: "Email required" },
      { input: "input#signupPassword", error: "Password required" },
      {
        input: "input#signupRepeatPassword",
        error: "Re-enter password required",
      },
    ];

    await signUpPage.waitForInputErrors(inputErrorSelectors);

    expect(await signUpPage.isRegisterButtonDisabled()).toBe(true);
  });

  test("Sign up with invalid data", async ({ page }) => {
    const signUpPage = new SignUpPage(page);
    await signUpPage.openSignUpModal();
    const signupData = {
      signupName: "Te$t",
      signupLastName: "Au$o",
      signupEmail: "aqadispostable.com",
      signupPassword: "pasword",
      signupRepeatPassword: "pasword",
    };

    await signUpPage.signUpUser(signupData);

    const inputErrorSelectors = [
      { input: "input#signupName", error: "Name is invalid" },
      { input: "input#signupLastName", error: "Last name is invalid" },
      { input: "input#signupEmail", error: "Email is incorrect" },
      {
        input: "input#signupPassword",
        error:
          "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      },
      {
        input: "input#signupRepeatPassword",
        error:
          "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
      },
    ];

    await signUpPage.waitForInputErrors(inputErrorSelectors);

    expect(await signUpPage.isRegisterButtonDisabled()).toBe(true);
  });

  test("Sign up with mismatching passwords", async ({ page }) => {
    const signUpPage = new SignUpPage(page);

    await signUpPage.openSignUpModal();

    const signupData = {
      signupName: "Auto",
      signupLastName: "Test",
      signupEmail: `aqa_${generateRandomString()}@example.com`,
      signupPassword: "Password10",
      signupRepeatPassword: "Password102",
    };

    await signUpPage.signUpUser(signupData);

    const inputErrorSelectors = [
      { input: "input#signupRepeatPassword", error: "Passwords do not match" },
    ];

    await signUpPage.waitForInputErrors(inputErrorSelectors);

    expect(await signUpPage.isRegisterButtonDisabled()).toBe(true);
  });
});
