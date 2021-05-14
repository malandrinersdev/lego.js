const { getUserDiary } = require('../src/datasources/diaries')
const { getDiaryHumour, getDiaryBadges } = require('../src/badges/diaryBadges')

const user = 'sergioedo'
const commit = 'main'
getUserDiary(user, commit).then((diarioMD) => {
    console.log(getDiaryHumour(diarioMD))
    console.log(getDiaryBadges(diarioMD))
})
