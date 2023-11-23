import { test } from "../../src/fixtures/UserGaragePage.fixture.js";
import { expect } from "@playwright/test";
import GaragePage from "../../src/pageObjects/panel/garagePage/GaragePage.js";

test.describe("Garage page", () => {
  test.only("page should contain Garage header", async ({ GaragePage }) => {
    await expect(GaragePage.header).toHaveText("Garage");
  });
});

// test("should use storage state", async ({ page }) => {
// const garagePage = new GaragePage(page);
//     await garagePage.navigate();
//     await expect(GaragePage.header).toHaveText("Garage");

//   });
