const path = require('path')

const testUsersBadges = [
    {
        user: 'user01',
        badges: [
            {
                type: 'type1',
                name: 'badge1',
                url: 'http://bagdes.io/badge1',
            },
        ],
    },
    {
        user: 'user02',
        badges: [
            {
                type: 'type1',
                name: 'badge1',
                url: 'http://bagdes.io/badge1',
            },
            {
                type: 'type2',
                name: 'badge2',
                url: 'http://bagdes.io/badge2',
            },
        ],
    },
]

const { getUsersBadges: getUsersBadgesFromArray, getUserBadges } =
    require('./userBadges').config({
        source: 'array',
        usersBadges: testUsersBadges,
    })

test('get users badges from array', () => {
    const usersBadges = getUsersBadgesFromArray()
    expect(usersBadges).toEqual(testUsersBadges)
})

const { getUsersBadges: getUsersBadgesFromFile } =
    require('./userBadges').config({
        source: 'file',
        fileName: path.join(__dirname, '..', '..', 'data', 'userBadges.json'),
    })
const someRealUsersWithBadges = ['delineas', 'sergioedo']

test('get users badges from file', () => {
    const usersBadges = getUsersBadgesFromFile()
    const userWithBadges = usersBadges.map((ua) => ua.user)
    expect(userWithBadges).toEqual(
        expect.arrayContaining(someRealUsersWithBadges)
    )
})

test('get user01 badges (from array)', () => {
    const userBadges = getUserBadges('user01')
    const expectedUserBadges = testUsersBadges[0]
    expect(userBadges).toEqual(expectedUserBadges)
})
