import {test} from "@playwright/test";
import SignUpModel from "../../../src/models/auth/SignUpModel.js";
import {SignUpSchema} from "../../../src/schema/AuthSchema.js";
import {expect, test} from "@playwright/test";
import APIClient from "../../../src/client/APIClient.js";
import {USERS} from "../../../src/data/dict/users.js";
import CreateCarModel from "../../../src/models/cars/CreateCarModel.js";
import {VALID_BRANDS_RESPONSE_BODY} from "../../../src/data/dict/brands.js";
import {VALID_BRAND_MODELS} from "../../../src/data/dict/models.js";

test.describe('Auth', ()=>{
    let client = new APIClient()

    test.afterEach(async ()=>{
        await client.users.deleteCurrentUser()
    })

    test('should allow registration with valid data', async()=>{
        const signUpModel = SignUpModel.withRandomData()
            .setName("Sviat")
            .setLastName("Ord")
            .extract()
        let userId

        await test.step("Sign up", async ()=>{
            const response = await client.auth.signUp(signUpModel)
            expect(response.status).toBe(201)

            SignUpSchema.parse(response.data.data)

            const expectedBody = {
                "userId": expect.any(Number),
                "distanceUnits": "km",
                "photoFilename": "default-user.png",
                "currency": "usd"
            }
            expect(response.data.data, 'Response should ba valid').toEqual(expectedBody)
            userId = response.data.data.userId
        })

        await test.step("Get user info", async ()=>{
            client = await APIClient.authenticate({
                email: signUpModel.email,
                password: signUpModel.password,
                remember: false
            })

            const profileInfoResponse = await client.users.getUserProfileInfo()
            const expectedResponse = {
                "status": "ok",
                "data": {
                    "userId": userId,
                    "photoFilename": "default-user.png",
                    "name": signUpModel.name,
                    "lastName": signUpModel.lastName
                }
            }

            expect(profileInfoResponse.data).toEqual(expectedResponse)
        })


    })
})