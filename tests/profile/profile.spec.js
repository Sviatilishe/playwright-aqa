import { test } from "../../src/fixtures/UserGaragePage.fixture.js";
import { expect } from "@playwright/test";
// import ProfilePage from "../../src/pageObjects/profilePage/profilePage.js";
import GaragePage from "../../src/pageObjects/panel/garagePage/GaragePage.js";

test.describe("User profile", () => {
  test("page should contain valid user info", async ({
    userProfilePage,
    userInfo,
    page,
  }) => {
    await userProfilePage.navigate();
    await expect(
      userProfilePage.userName,
      "valid user name should be displayed",
    ).toHaveText(`${userInfo.name} ${userInfo.lastName}`);

    const garagePage = new GaragePage(page);
    await garagePage.navigate();
  });
  //   test('should use storage state', async ({page, userInfo})=>{
  //     const profilePage = new ProfilePage(page)
  //     await profilePage.navigate()
  //     await expect(profilePage.userName, "valid user name should be displayed").toHaveText(`${userInfo.name} ${userInfo.lastName}`)
  // })
});
