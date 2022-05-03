import supertest from 'supertest'
import { expect } from 'chai'
import app from '../../../../../src/app'
import { response_schema } from '../../../../../src/api/v1/patients/get.patients'


const url = '/api/v1/patients'
const invalidUrl = '/api/v1/stneitap'


describe(`[GET] ${url}`, () => {
    it('Response should return list of patients', async () => {
        const response = await supertest(app)
            .get(url)
            .set('Content-Type', 'application/json')

        expect(response.status).to.eq(200)
        expect(response.type).to.eq('application/json')

        const validationResult = response_schema.validate(response.body)
        expect(validationResult.error).to.eq(undefined)
    })

    it('Response should return list of patients', async () => {
        const response = await supertest(app)
            .get(url)
            .query({
                random: 'random'
            })
            .set('Content-Type', 'application/json')

        expect(response.status).to.eq(400)
        expect(response.type).to.eq('application/json')
    })
    it('Response should return list of patients (404)', async () => {
        const response = await supertest(app)
            .get(invalidUrl)
            .set('Content-Type', 'application/json')

        expect(response.status).to.eq(404)
        expect(response.type).to.eq('application/json')
    })
    it("Response should return list patients (405)", async () => {
        const response = await supertest(app)
            .post(url)
            .set('Content-Type', 'application/json')

        expect(response.status).to.eq(405)
        expect(response.type).to.eq('application/json')


    });
})
