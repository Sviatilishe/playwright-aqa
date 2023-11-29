import { test } from "../../../src/fixtures/UserGaragePage.fixture.js";
import { expect } from "@playwright/test";
import { VALID_BRANDS_RESPONSE_BODY } from "../../../src/data/dict/brands.js";
import { VALID_BRAND_MODELS } from "../../../src/data/dict/models.js";
import { USERS } from "../../../src/data/dict/users.js";
import pkg from "../../../playwright.config.api.cjs";
const config = pkg.use;
import APIClient from "../../../src/client/APIClient.js";
import { getRandomNumber } from "../../../src/Utils/helpers.js";

test.describe("POST", () => {
  let client;

  test.beforeAll(async () => {
    client = await APIClient.authenticate(
      { baseURL: process.env.API_URL },
      {
        email: USERS.JD.email,
        password: USERS.JD.password,
        remember: false,
      },
    );
  });

  test("should create a car", async () => {
    const brandId = VALID_BRANDS_RESPONSE_BODY.data[1].id;
    const modelId = VALID_BRAND_MODELS[brandId].data[1].id;

    const createRequestBody = {
      carBrandId: brandId,
      carModelId: modelId,
      mileage: getRandomNumber(),
    };

    const createResponse = await client.cars.createCar(createRequestBody);
    expect(createResponse.status, "Create Status code should be 201").toEqual(
      201,
    );
    expect(createResponse.data.status).toBe("ok");
    expect(
      createResponse.data.data,
      "Car should be created with data from request",
    ).toMatchObject(createRequestBody);
  });
});
