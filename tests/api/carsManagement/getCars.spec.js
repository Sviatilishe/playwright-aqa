import { test } from "../../../src/fixtures/UserGaragePage.fixture.js";
import { expect } from "@playwright/test";
import { VALID_BRANDS_RESPONSE_BODY } from "../../../src/data/dict/brands.js";
import { VALID_BRAND_MODELS } from "../../../src/data/dict/models.js";
import { USERS } from "../../../src/data/dict/users.js";
import pkg from "../../../playwright.config.api.cjs";
const config = pkg.use;
import APIClient from "../../../src/client/APIClient.js";
import { getRandomNumber } from "../../../src/Utils/helpers.js";

test.describe("GET", () => {
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

  test("should return user's cars", async () => {
    const response = await client.cars.getUserCars();
    expect(response.status, "Status code should be 200").toEqual(200);
  });

  test("should return user's car by ID", async () => {
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

    const id = createResponse.data.data.id;
    const getResponse = await client.cars.getUserCarById(id);
    expect(getResponse.status, "Response Status code should be 200").toEqual(
      200,
    );
    expect(getResponse.data.status).toBe("ok");
  });

  test("should return user's cars brands", async () => {
    const response = await client.cars.getUserCarsBrands();
    expect(response.status, "Status code should be 200").toEqual(200);
  });

  test("should return user's cars brand by ID", async () => {
    const response = await client.cars.getUserCarsBrands();
    expect(response.status, "Status code should be 200").toEqual(200);
    const brandId = "3";

    const brandResponse = await client.cars.getUserCarsBrandsById(brandId);
    expect(brandResponse.status, "Status code should be 200").toEqual(200);

    const model = brandResponse.data;

    expect(model, "Brand with ID 3 should exist").toBeTruthy();
    expect(model.status, "Status should be 'ok'").toEqual("ok");
    expect(model.data.id, "Brand ID should be 3").toEqual(3);
    expect(model.data.title, "Model title should be 'Ford'").toEqual("Ford");
  });

  test("should return user's cars models", async () => {
    const response = await client.cars.getUserCarsModels();
    expect(response.status, "Status code should be 200").toEqual(200);
  });

  test("should return user's cars models by ID", async () => {
    const response = await client.cars.getUserCarsModels();
    expect(response.status, "Status code should be 200").toEqual(200);
    const modelId = "2";

    const modelResponse = await client.cars.getUserCarsModelsById(modelId);
    expect(modelResponse.status, "Status code should be 200").toEqual(200);

    const model = modelResponse.data;

    expect(model, "Model with ID 2 should exist").toBeTruthy();
    expect(model.status, "Status should be 'ok'").toEqual("ok");
    expect(model.data.id, "Model ID should be 2").toEqual(2);
    expect(model.data.carBrandId, "Car brand ID should be 1").toEqual(1);
    expect(model.data.title, "Model title should be 'R8'").toEqual("R8");
  });
});
