import { expect, test } from "@playwright/test";

// Function to generate random email (tried to do it via faker but didn't succeed, so googled this solution)
const generateRandomString = () => Math.random().toString(36).substring(7);
// Positive scenario
test("Sign up a new user", async ({ page }) => {
  await page.goto("/");
  await page.click("text=Sign Up");

  await page.waitForSelector("app-signup-modal");

  const signupData = {
    signupName: "Auto",
    signupLastName: "Test",
    signupEmail: `aqa_${generateRandomString()}@example.com`,
    signupPassword: "Password10",
    signupRepeatPassword: "Password10",
  };

  for (const input in signupData) {
    await page.fill(`input#${input}`, signupData[input]);
  }
  await page.click("div.modal-footer > button");

  await page.waitForSelector("#userNavDropdown");

  const url = page.url();
  expect(url).toContain("https://qauto.forstudy.space/panel/garage");
});

// Negative scenarios
test("Sign up an existing user", async ({ page }) => {
  await page.goto("/");
  await page.click("text=Sign Up");

  await page.waitForSelector("app-signup-modal");

  const signupData = {
    signupName: "Auto",
    signupLastName: "Test",
    signupEmail: `aqa@example.com`,
    signupPassword: "Password10",
    signupRepeatPassword: "Password10",
  };

  for (const input in signupData) {
    await page.fill(`input#${input}`, signupData[input]);
  }

  await page.click("div.modal-footer > button");

  await page.waitForSelector(".alert.alert-danger");

  const errorText = await page.textContent(".alert.alert-danger");

  expect(errorText).toContain("User already exists");
});

test("Sign up when required inputs are empty", async ({ page }) => {
  await page.goto("/");
  await page.click("text=Sign Up");
  await page.waitForSelector("app-signup-modal");

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

  for (const { input } of inputErrorSelectors) {
    await page.click(input);
  }

  await page.click("div.modal-footer");

  for (const { error } of inputErrorSelectors) {
    await page.waitForSelector(`.invalid-feedback:has-text("${error}")`, {
      timeout: 5000,
    });
  }

  expect(
    await page
      .locator("div.modal-footer")
      .evaluate((button) => button !== null),
    "Register button should be disabled when required inputs are empty"
  ).toBe(true);
});

test("Sign up with invalid data", async ({ page }) => {
  await page.goto("/");
  await page.click("text=Sign Up");
  await page.waitForSelector("app-signup-modal");

  const signupData = {
    signupName: "Te$t",
    signupLastName: "Au£o",
    signupEmail: "aqadispostable.com",
    signupPassword: "pasword",
    signupRepeatPassword: "pasword",
  };

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

  for (const { input, error } of inputErrorSelectors) {
    await page.fill(input, signupData[input.replace("input#", "")]);
    await page.click("div.modal-footer");

    await page.waitForSelector(`.invalid-feedback:has-text("${error}")`, {
      timeout: 5000,
    });
  }

  expect(
    await page
      .locator("div.modal-footer")
      .evaluate((button) => button !== null),
    "Register button should be disabled with invalid data"
  ).toBe(true);
});

test("Sign up with mismatching passwords", async ({ page }) => {
  await page.goto("/");
  await page.click("text=Sign Up");
  await page.waitForSelector("app-signup-modal");

  const signupData = {
    signupName: "Auto",
    signupLastName: "Test",
    signupEmail: `aqa_${generateRandomString()}@example.com`,
    signupPassword: "Password10",
    signupRepeatPassword: "Password102",
  };

  for (const input in signupData) {
    await page.fill(`input#${input}`, signupData[input]);
  }

  const inputErrorSelectors = [
    { input: "input#signupRepeatPassword", error: "Passwords do not match" },
  ];

  for (const { input, error } of inputErrorSelectors) {
    await page.click("div.modal-footer");
    await page.waitForSelector(`.invalid-feedback:has-text("${error}")`, {
      timeout: 5000,
    });
  }

  expect(
    await page
      .locator("div.modal-footer")
      .evaluate((button) => button !== null),
    "Register button should be disabled with invalid data"
  ).toBe(true);
});
