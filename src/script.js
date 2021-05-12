const { getUserDiary } = require('../js/diarios.js')
const { getDiaryHumour, getDiaryBadges } = require('../js/insignias.js')

const user = 'sergioedo'
const commit = 'main'
getUserDiary(user, commit).then((diarioMD) => {
    console.log(getDiaryHumour(diarioMD))
    console.log(getDiaryBadges(diarioMD))
})
