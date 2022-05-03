import supertest from "supertest";
import { expect } from "chai";
import app from '../../../../../src/app'
import { schema } from "../../../../../src/api/v1/patients/delete.patients";
import { response_schema } from "../../../../../src/api/v1/patients/get.patients";

const url = '/api/v1/patients/'
const patientID: number = 2300

describe(`[DELETE] ${url + `${patientID}`}`, () => {
    it('Response should return message about deleted patient', async() => {
        const response = await supertest(app)
            .delete(url + patientID)
            .set('Content-Type', 'application/json')

        expect(response.status).to.eq(200)
        expect(response.type).to.eq('application/json')

        const validationResult = response_schema.validate(response.body)
        expect(validationResult.error).to.eq(undefined)


    })

    it('Response should return 404 because patient should be deleted', async() =>{
        const response = await supertest(app)
            .get(url+patientID)
            .set('Content-Type', 'application/json')

        expect(response.status).to.eq(404)
        expect(response.type).to.eq('application/json')

        const validationResult = schema.validate(response.body)
        expect(validationResult.error).to.eq(undefined)
    })
    it('Response should delete patient (404) but didnt find ID', async() => {
        const response = await supertest(app)
            .delete(url + 69420)
            .set('Content-Type', 'application/json')

        expect(response.status).to.eq(404)
        expect(response.type).to.eq('application/json')

        const validationResult = schema.validate(response.body)
        expect(validationResult.error).to.eq(undefined)
          

    })
})
