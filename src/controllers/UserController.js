import BaseController from "./BaseController.js";

export default class UserController extends BaseController {
    #DELETE_USER_PATH = '/users'
    #GET_USER_PROFILE_PATH = '/users/profile'

    constructor(options) {
        super(options)
    }

    async getUserProfileInfo(){
        return this._client.get(this.#GET_USER_PROFILE_PATH)
    }

    async deleteCurrentUser(){
        return this._client.delete(this.#DELETE_USER_PATH)
    }
}