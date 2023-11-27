import { test } from "../../../src/fixtures/userGaragePage.fixture.js";
import { expect } from "@playwright/test";
import { VALID_BRANDS_RESPONSE_BODY } from "../../../src/data/dict/brands.js";
import { VALID_BRAND_MODELS } from "../../../src/data/dict/models.js";
import { LOGGED_IN_USER_RESPONSE_BODY } from "../../../src/data/dict/users.js";

test.describe("API", () => {
  test("should create new cars", async ({ userAPIClient }) => {
    const brandId = VALID_BRANDS_RESPONSE_BODY.data[1].id;
    const modelId = VALID_BRAND_MODELS[brandId].data[1].id;

    const requestBody = {
      carBrandId: brandId,
      carModelId: modelId,
      mileage: 200,
    };

    const response = await userAPIClient.post("/api/cars", {
      data: requestBody,
    });

    const body = await response.json();

    await expect(response, "Positive response should be returned").toBeOK();
    expect(response.status(), "Status code should be 200").toEqual(200);
    expect(body.status).toBe("ok");
    expect(
      body.data,
      "Car should be created with data from request",
    ).toMatchObject(requestBody);

    // Additional car creation
    const brandId2 = VALID_BRANDS_RESPONSE_BODY.data[3].id;
    const modelId2 = VALID_BRAND_MODELS[brandId2].data[3].id;

    const requestBody2 = {
      carBrandId: brandId2,
      carModelId: modelId2,
      mileage: 3000,
    };

    const response2 = await userAPIClient.post("/api/cars", {
      data: requestBody2,
    });

    const body2 = await response2.json();

    await expect(
      response2,
      "Positive response should be returned for second car",
    ).toBeOK();
    expect(
      response2.status(),
      "Status code should be 200 for second car",
    ).toEqual(200);
    expect(body2.status).toBe("ok");
    expect(
      body2.data,
      "Second car should be created with data from request",
    ).toMatchObject(requestBody2);
  });

  test("Route not found", async ({ userAPIClient }) => {
    const brandId = VALID_BRANDS_RESPONSE_BODY.data[4].id;
    const modelId = VALID_BRAND_MODELS[brandId].data[4].id;
    const requestBody = {
      carBrandId: brandId,
      carModelId: modelId,
      mileage: 122,
    };

    const response = await userAPIClient.post("/api/cars/madeup-endpoint", {
      data: requestBody,
    });
    const body = await response.json();

    expect(response, "Negative response should be returned").not.toBe(200);
    expect(body.status).not.toBe("ok");

    expect(response.status(), "Status code should be 404").toEqual(404);
    expect(body.status).toBe("error");
    expect(body.message).toBe("Not found");
  });

  test("User is not logged in", async ({ userAPIClient }) => {
    const userID = LOGGED_IN_USER_RESPONSE_BODY.data[0].userId;
    const requestBody = {
      userID: userID,
    };

    const response = await userAPIClient.post("/api/cars", {
      data: requestBody,
    });

    await expect(response, "User is not logged in").not.toBeOK();

    expect(response.status(), "Status code should be 401").toEqual(401);

    const bodyUnauthenticated = await response.json();

    expect(bodyUnauthenticated.status).toBe("error");
    expect(bodyUnauthenticated.message).toBe("Not authenticated");
  });
});
