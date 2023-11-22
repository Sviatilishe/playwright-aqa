import crypto from "crypto";

export default class StringUtils {
  static randomString() {
    crypto.randomBytes(32).toString("hex");
  }
}
