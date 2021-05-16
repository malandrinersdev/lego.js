const path = require('path')

const testUsers = ['pepe', 'manolo', 'jose']

const { getUsers: getUsersFromArray } = require('./users').config({
    source: 'array',
    users: testUsers,
})

test('get users from array', () => {
    const users = getUsersFromArray()
    expect(users).toEqual(testUsers)
})

const { getUsers: getUsersFromFile } = require('./users').config({
    source: 'file',
    fileName: path.join(__dirname, '..', '..', 'data', 'users.json'),
})
const someRealUsers = ['delineas', 'sergioedo']

test('get users from file', () => {
    const users = getUsersFromFile()
    expect(users).toEqual(expect.arrayContaining(someRealUsers))
})
