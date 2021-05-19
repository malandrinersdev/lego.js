const path = require('path')
const fs = require('fs')

const testUser = 'user01'
const diariesPath = path.join(__dirname, '..', '..', 'data', 'diaries')
const userDiaryFile = path.join(diariesPath, `${testUser}.md`)
const expectedDiary = fs.readFileSync(userDiaryFile, 'utf8')

const { getUserDiary } = require('./userDiaries').config({
    source: 'file',
    dirPath: diariesPath,
})

test(`get user ${testUser} diary from file`, () => {
    getUserDiary(testUser).then((userDiary) => {
        expect(userDiary).toEqual(expectedDiary)
    })
})
