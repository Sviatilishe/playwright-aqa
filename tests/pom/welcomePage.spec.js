import { expect, test } from "@playwright/test";
import WelcomePage from "../../src/pageObjects/welcomePage/WelcomePage.js";
import { HEADER_LINKS_WELCOME_PAGE } from "../pom/savedLinks/welcome.fixture.js";

test.describe("Welcome page", () => {
  let page;
  let welcomePage;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext({
      viewport: {
        width: 1920,
        height: 1080,
      },
    });

    page = await context.newPage();
    welcomePage = new WelcomePage(page);
  });

  test.beforeEach(async () => {
    await welcomePage.open();
    await welcomePage.waitLoaded();
  });

  test("should contain all required links in header", async () => {
    const linksText = await welcomePage.header.getLinksText();
    expect(linksText, "All required links should be present").toEqual(
      HEADER_LINKS_WELCOME_PAGE,
    );
  });

  test("should contain all required links in header 2", async () => {
    await welcomePage.header.verifyLinksText(HEADER_LINKS_WELCOME_PAGE);
  });
});
