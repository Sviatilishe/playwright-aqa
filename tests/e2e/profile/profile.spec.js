import { test } from "../../../src/fixtures/userGaragePage.fixture.js";
import { USER_RESPONSE_BODY } from "../profile/fixtures/profileResponse.js";

test("profile page should display changed user name", async ({
  userProfilePage,
}) => {
  const { page } = userProfilePage;
  await page.route("/api/users/profile", (route) => {
    route.fulfill({ body: JSON.stringify(USER_RESPONSE_BODY) });
  });

  await userProfilePage.navigate();
  await page.waitForSelector("div.panel-page_content > div > p");

  const userDataText = await page.$eval(
    "div.panel-page_content > div > p",
    (element) => element.textContent.trim(),
  );
  if (userDataText !== "Svi O") {
    throw new Error(`Expected 'Svi O' but got '${userDataText}'`);
  }
});
