import BaseController from "../../src/controllers/BaseController.js";

export default class AuthController extends BaseController {
  #SIGN_IN_PATH = "https://qauto.forstudy.space/api/auth/signin";

  constructor(options) {
    super(options);
  }
  async signIn({ email, password, remember = false }) {
    return this._client.post(this.#SIGN_IN_PATH, {
      email,
      password,
      remember,
    });
  }
}
