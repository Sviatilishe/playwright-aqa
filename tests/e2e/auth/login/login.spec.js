import { expect, test } from "@playwright/test";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Auth", () => {
  let page;

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should show error message when user enters wrong password", async ({
    page,
  }) => {
    const email = "svord94@gmail.com";
    const password = email.split("").reverse().join("");

    const signInButton = page.locator("button.header_signin");
    await expect(
      signInButton,
      "Sign in button should be visible",
    ).toBeVisible();
    await expect(
      signInButton,
      "Sign in button should be enabled",
    ).toBeEnabled();

    await signInButton.click();

    const popup = page.locator("div.modal-dialog");
    await expect(popup, "Sign in popup should be visible").toBeVisible();

    const emailInput = popup.locator("input#signinEmail");
    const passwordInput = popup.locator("input#signinPassword");
    const loginButton = popup.locator(".btn-primary");

    await emailInput.fill(email);
    await passwordInput.fill(password);
    await loginButton.click();

    const alertMessage = popup.locator("p.alert-danger");
    await expect(
      alertMessage,
      "Alert message should be shown when the user has entered an invalid email",
    ).toHaveText("Wrong email or password");
  });

  test("Login", async ({ page }) => {
    const email = "svord94@gmail.com";
    const password = "Qweasdzxc10";

    const signInButton = page.locator("button.header_signin");
    await expect(
      signInButton,
      "Sign in button should be visible",
    ).toBeVisible();
    await expect(
      signInButton,
      "Sign in button should be enabled",
    ).toBeEnabled();

    await signInButton.click();

    const popup = page.locator("div.modal-dialog");
    await expect(popup, "Sign in popup should be visible").toBeVisible();

    const emailInput = popup.locator("input#signinEmail");
    const passwordInput = popup.locator("input#signinPassword");
    const loginButton = popup.locator(".btn-primary");

    await emailInput.fill(email);
    await passwordInput.fill(password);

    await loginButton.click();
  });
});
