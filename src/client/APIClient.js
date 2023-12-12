import AuthController from "../../src/controllers/AuthController.js";
import CarController from "../../src/controllers/CarController.js";
import { CookieJar } from "tough-cookie";
import pkg from "../../playwright.config.api.cjs";
const config = pkg.use;
import UserController from "../controllers/UserController.js"

export default class APIClient {
  constructor(options) {
    this.auth = new AuthController(options);
    this.users = new UserController(options);
    this.cars = new CarController(options);
  }

  static async authenticate( userData,
    options = { baseURL: process.env.API_URL },
   
  ) {
    const jar = new CookieJar();
    const params = { ...options, cookies: jar };
    const authController = new AuthController(params);
    await authController.signIn(userData);
    return new APIClient(params);
  }
}
