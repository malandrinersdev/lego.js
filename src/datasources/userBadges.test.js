const path = require('path')

const testUserBadges = [
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

const { getUserBadges: getUserBadgesFromArray } =
    require('./userBadges').config({
        source: 'array',
        userBadges: testUserBadges,
    })

test('get user badges from array', () => {
    const userBadges = getUserBadgesFromArray()
    expect(userBadges).toEqual(testUserBadges)
})

const { getUserBadges: getUserBadgesFromFile } = require('./userBadges').config(
    {
        source: 'file',
        fileName: path.join(__dirname, '..', '..', 'data', 'userBadges.json'),
    }
)
const someRealUsersWithBadges = ['delineas', 'sergioedo']

test('get user badges from file', () => {
    const userBadges = getUserBadgesFromFile()
    const userWithBadges = userBadges.map((ua) => ua.user)
    expect(userWithBadges).toEqual(
        expect.arrayContaining(someRealUsersWithBadges)
    )
})
