const { getUserDiary } = require('./datasources/userDiaries').config({
    source: 'github',
    commit: 'main',
})
const { getDiaryHumour, getDiaryBadges } = require('./badges/diaryBadges')

const user = 'sergioedo'
getUserDiary(user).then((diarioMD) => {
    console.log(getDiaryHumour(diarioMD))
    console.log(getDiaryBadges(diarioMD))
})
