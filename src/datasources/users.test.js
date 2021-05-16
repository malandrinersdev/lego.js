const path = require('path')

const testUsers = ['pepe', 'manolo', 'jose']

const { getUsers: getUsersFromArray, userExists } = require('./users').config({
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

test('check if user exists from user array', () => {
    expect(userExists(testUsers[0])).toBe(true)
})

test('check if user not exists from user array', () => {
    expect(userExists('user_not_valid')).toBe(false)
})
