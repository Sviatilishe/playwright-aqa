import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";
import axios from "axios";
import pkg from "../../playwright.config.api.cjs";
const config = pkg.use;

export default class BaseController {
  constructor({ baseURL, cookies } = { baseURL: process.env.API_URL }) {
    this._baseURL = baseURL;
    const jar = cookies ?? new CookieJar();
    this._client = wrapper(
      axios.create({
        baseURL: this._baseURL,
        jar,
        validateStatus: (status) => {
          return status < 501;
        },
      }),
    );
  }
}
