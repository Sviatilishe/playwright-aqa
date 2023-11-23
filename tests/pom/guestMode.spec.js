import { expect } from "@playwright/test";
import { test } from "../../src/fixtures/UserGaragePage.fixture.js";
import WelcomePage from "../../src/pageObjects/welcomePage/WelcomePage.js";

test.describe("Guest mode", () => {
  let page;
  let welcomePage;
  let garagePage;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext({
      viewport: {
        width: 1920,
        height: 1080,
      },
    });

    page = await context.newPage();
    welcomePage = new WelcomePage(page);
    await welcomePage.open();
    await welcomePage.waitLoaded();
  });

  test.beforeEach(async () => {
    garagePage = await welcomePage.loginAsGuest();
  });

  test.afterEach(async () => {
    await garagePage.logout();
  });

  test("should contain all required links in header", async ({
    headerLinks,
  }) => {
    const linksText = await garagePage.header.getLinksText();
    expect(linksText, "All required links should be present").toEqual(
      headerLinks,
    );
  });
});
