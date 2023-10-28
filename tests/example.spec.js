import { expect, test } from "@playwright/test";

test("has title", async ({ page, baseURL }) => {
  await page.goto(baseURL);

  await expect(page).toHaveTitle(/Future Expected Title/);
});

test("get started link", async ({ page, baseURL }) => {
  await page.goto(baseURL);

  await page.click("your-selector-for-the-get-started-link");

  await expect(page.waitForSelector("selector-for-heading")).toBeVisible();
});
