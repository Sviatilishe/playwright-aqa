import { test } from "../../src/fixtures/UserGaragePage.fixture.js";
import { expect } from "@playwright/test";
import { VALID_BRANDS_RESPONSE_BODY } from "../../src/data/dict/brands.js";
import { VALID_BRAND_MODELS } from "../../src/data/dict/models.js";
import axios from "axios";
import pkg from "../../playwright.config.api.cjs";
const config = pkg.use;
import { USERS } from "../../src/data/dict/users.js";

test.describe("API", () => {
  let client;
  test.beforeAll(async () => {
    client = axios.create({
      baseURL: process.env.API_URL,
    });

    const responseLogin = await client.post("/auth/signin", {
      email: USERS.JD.email,
      password: USERS.JD.password,
      remember: false,
    });

    // Check if sign-in was successful
    expect(responseLogin.status, "Sign-in status code should be 200").toEqual(
      200,
    );
    expect(responseLogin.data.status).toBe("ok");

    const cookie = responseLogin.headers["set-cookie"][0].split(";")[0];
    client = axios.create({
      baseURL: process.env.API_URL,
      headers: {
        cookie,
      },
      validateStatus: (status) => {
        return status < 501;
      },
    });
  });
  test("should create new cars", async () => {
    const brandId = VALID_BRANDS_RESPONSE_BODY.data[1].id;
    const modelId = VALID_BRAND_MODELS[brandId].data[1].id;

    const requestBody = {
      carBrandId: brandId,
      carModelId: modelId,
      mileage: 222,
    };

    const response = await client.post(
      "https://qauto.forstudy.space/api/cars",
      requestBody,
    );
    expect(response.status, "Status code should be 201").toEqual(201);
    expect(response.data.status).toBe("ok");
    expect(
      response.data.data,
      "Car should be created with data from request",
    ).toMatchObject(requestBody);

    // Additional car creation
    const brandId2 = VALID_BRANDS_RESPONSE_BODY.data[1].id;
    const modelId2 = VALID_BRAND_MODELS[brandId2].data[1].id;

    const requestBody2 = {
      carBrandId: brandId2,
      carModelId: modelId2,
      mileage: 3000,
    };

    const response2 = await client.post(
      "https://qauto.forstudy.space/api/cars",
      requestBody2,
    );
    expect(
      response2.status,
      "Status code should be 201 for second car",
    ).toEqual(201);
    expect(response2.data.status).toBe("ok");
    expect(
      response2.data.data,
      "Second car should be created with data from request",
    ).toMatchObject(requestBody2);
  });
  test("shouldn't create a car with negative mileage value", async () => {
    const brandId = VALID_BRANDS_RESPONSE_BODY.data[0].id;
    const modelId = VALID_BRAND_MODELS[brandId].data[1].id;

    const requestBody = {
      carBrandId: brandId,
      carModelId: modelId,
      mileage: -222,
    };

    const response = await client.post(
      "https://qauto.forstudy.space/api/cars",
      requestBody,
    );
    expect(response.status, "Status code should be 400").toEqual(400);
    expect(response.data.status).toBe("error");
    expect(
      response.data.data,
      "Car should be created with data from request",
    ).toBeUndefined();
  });
  test("ivalid endpoint for car creation", async () => {
    const brandId = VALID_BRANDS_RESPONSE_BODY.data[0].id;
    const modelId = VALID_BRAND_MODELS[brandId].data[1].id;

    const requestBody = {
      carBrandId: brandId,
      carModelId: modelId,
      mileage: 222,
    };

    const response = await client.post("/api/cars", requestBody);
    expect(response.status, "Status code should be 400").toEqual(404);
    expect(response.data.status).toBe("error");
    expect(response.data.data, "Route not found").toBeUndefined();
  });
});
