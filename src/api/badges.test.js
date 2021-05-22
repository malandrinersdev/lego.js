const path = require('path')
const request = require('supertest')
const jestOpenAPI = require('jest-openapi')
const app = require('../app')

jestOpenAPI(path.join(__dirname, 'badges.swagger.yml'))

test('get all user badges from API', async () => {
    const response = await request(app).get('/badges')
    expect(response.status).toBe(200)
    expect(response).toSatisfyApiSpec()
})

const testUser = 'user01'
test(`get ${testUser} badges from API`, async () => {
    const response = await request(app).get(`/badges/${testUser}`)
    expect(response.status).toBe(200)
    expect(response).toSatisfyApiSpec()
    expect(response.body.user).toBe(testUser)
})
