import { test } from "../../../src/fixtures/userGaragePage.fixture.js";
import { CUSTOM_BRANDS_RESPONSE_BODY } from "./fixtures/brands.js";
import { CUSTOM_MODELS_RESPONSE_BODY } from "./fixtures/models.js";

test.describe("Guest mode", () => {
  test("frontend should send correct request to get brands", async ({
    userGaragePage,
  }) => {
    const { page } = userGaragePage;

    await page.route("/api/cars/brands", (route) => route.abort());

    await userGaragePage.addCarBtn.click();
    // todo check if inputs is disabled
  });

  test("frontend should use brands returned in response", async ({
    userGaragePage,
  }) => {
    const brandId = CUSTOM_BRANDS_RESPONSE_BODY.data[0].id;
    const { page } = userGaragePage;

    await page.route("/api/cars/brands", (route) => {
      route.fulfill({ body: JSON.stringify(CUSTOM_BRANDS_RESPONSE_BODY) });
    });
    await page.route(`/api/cars/models?carBrandId=${brandId}`, (route) => {
      route.fulfill({ body: JSON.stringify(CUSTOM_MODELS_RESPONSE_BODY) });
    });

    await userGaragePage.addCarBtn.click();
    // todo check if custom values are set in dropdowns
  });
});
