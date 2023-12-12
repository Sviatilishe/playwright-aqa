import {faker} from "@faker-js/faker";

export default class SignUpModel {
    constructor(data) {
        this._data = data
    }

    extract(){
        return structuredClone(this._data)
    }

    setName(name){
        this._data.name = name
        return this
    }

    setLastName(name){
        this._data.name = name
        return this
    }


    static withRandomData (){
        const password = faker.internet.password({length: 12, prefix: 'AQA_'})
        return new SignUpModel({
            "name": faker.person.firstName(),
            "lastName": faker.person.lastName(),
            "email": faker.internet.email(),
            "password": password,
            "repeatPassword": password
        })
    }
}