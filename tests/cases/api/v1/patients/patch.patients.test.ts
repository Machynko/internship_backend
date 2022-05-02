import supertest from "supertest";
import {expect} from "chai";
import app from '../../../../../src/app'
import {response_schema} from "../../../../../src/api/v1/patients/get.patients";
import {schema} from "../../../../../src/api/v1/patients/patch.patients";

const url = '/api/v1/patients/'
const patientID: number = 9

const newPatient = {
    firstName: "Marek",
    lastName: "LorumIpsum",
    birthdate: "2000-08-23T10:30:40.890Z",
    weight: 92,
    height: 201
}

describe(`[PATCH] ${url + patientID}`, () => {
    it('Response should return message about update', async () => {
        const response = await supertest(app)
            .patch(url + patientID)
            .send(newPatient)
            .set('Content-Type', 'application/json')

        expect(response.status).to.eq(200)
        expect(response.type).to.eq('application/json')

        const validationResult = schema.validate(response.body)
        expect(validationResult.error).to.eq(undefined)
    })

    it('Response should return and print updated patient', async () => {
        const response = await supertest(app)
            .get(url + patientID)
            .set('Content-Type', 'application/json')

        expect(response.status).to.eq(200)
        expect(response.type).to.eq('application/json')

        const validationResult = response_schema.validate(response.body)
        expect(validationResult.error).to.eq(undefined)
    })

})
