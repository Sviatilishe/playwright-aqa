import BaseController from "../../src/controllers/BaseController.js";

export default class CarController extends BaseController {
  #CREATE_CAR_PATH = "/cars";
  #EDIT_USERS_CARS_PATH = "/cars/#";
  #GET_USER_CARS_PATH = "/cars";
  #DELETE_USER_CARS_PATH = "/cars/#";
  #GET_USER_CARS_BRANDS_PATH = "/cars/brands";
  #GET_USER_CARS_BRANDS_ID = "/cars/brands/#";
  #GET_USER_CARS_MODELS = "/cars/models";
  #GET_USER_CARS_MODELS_BY_ID = "/cars/models/#";
  #GET_USER_CAR_BY_ID = "/cars/#";
  constructor(options) {
    super(options);
  }

  async createCar(createCarRequestBody) {
    return this._client.post(this.#CREATE_CAR_PATH, createCarRequestBody);
  }
  async editUserCar(id, editCarRequestBody) {
    const path = this.#EDIT_USERS_CARS_PATH.replace("#", id);
    return this._client.put(path, editCarRequestBody);
  }

  async getUserCars() {
    return this._client.get(this.#GET_USER_CARS_PATH);
  }

  async deleteUserCar(id) {
    const path = this.#DELETE_USER_CARS_PATH.replace("#", id);
    return this._client.delete(path);
  }
  async getUserCarsBrands() {
    return this._client.get(this.#GET_USER_CARS_BRANDS_PATH);
  }

  async getUserCarsBrandsById(id) {
    const path = this.#GET_USER_CARS_BRANDS_ID.replace("#", id);
    return this._client.get(path);
  }

  async getUserCarsModels() {
    return this._client.get(this.#GET_USER_CARS_MODELS);
  }

  async getUserCarsModelsById(id) {
    const path = this.#GET_USER_CARS_MODELS_BY_ID.replace("#", id);
    return this._client.get(path);
  }

  async getUserCarById(id) {
    const path = this.#GET_USER_CAR_BY_ID.replace("#", id);
    return this._client.get(path);
  }
}
