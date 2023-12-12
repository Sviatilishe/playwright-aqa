import { expect, test } from "@playwright/test";
import { VALID_BRANDS_RESPONSE_BODY } from "../../../src/data/dict/brands.js";
import { VALID_BRAND_MODELS } from "../../../src/data/dict/models.js";
import { USERS } from "../../../src/data/dict/users.js";
import APIClient from "../../../src/client/APIClient.js";
import { getRandomNumber } from "../../../src/Utils/helpers.js";
import CreateCarModel from "../../../src/models/cars/CreateCarModel.js";
import EditCarModel from "../../../src/models/cars/EditCarModel.js";

test.describe('POST', () => {
  let client;

  test.beforeAll(async () => {
    client = await APIClient.authenticate({
      "email": USERS.JD.email,
      "password": USERS.JD.password,
      "remember": false,
    });
  });

  test("should edit created car using EditCarModel", async () => {
    const carModel = new CreateCarModel({carBrandId: 4, carModelId: 17, mileage: 1})
    const brand = VALID_BRANDS_RESPONSE_BODY.data.find((brand)=> brand.id === carModel.carBrandId)
    const model = VALID_BRAND_MODELS[brand.id].data.find((model)=> model.id === carModel.carModelId)
    const response = await client.cars.createCar(carModel)

    const expectedBody = {
        ...carModel,
        initialMileage: carModel.mileage,
        id: expect.any(Number),
        carCreatedAt: expect.any(String),
        updatedMileageAt: expect.any(String),
        brand: brand.title,
        model: model.title,
        logo: brand.logoFilename
    }
    expect(response.data.data, 'Returned car should be valid').toEqual(expectedBody)
    
    const id = response.data.data.id;
    const editRequestBody = new EditCarModel({
      carId: id,
      mileage: getRandomNumber(),
    });

    const editResponse = await client.cars.editUserCar(id, editRequestBody);

    console.log("Edit Response:", editResponse.status, editResponse.data);

    expect(editResponse.status, "Edit Status code should be 200").toEqual(200);
    expect(editResponse.data.status).toBe("ok");

    const editedCar = editResponse.data.data;

    expect(editedCar).toMatchObject({
      id: expect.any(Number),
      initialMileage: expect.any(Number),
      carCreatedAt: expect.any(String),
      updatedMileageAt: expect.any(String),
      brand: expect.any(String),
      model: expect.any(String),
      logo: expect.any(String),
    });
    
    expect(editedCar).toMatchObject({
      carBrandId: carModel.carBrandId, 
      carModelId: carModel.carModelId,
      mileage: editRequestBody.mileage,
    });
  });
});
