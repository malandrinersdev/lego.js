const { getUserDiary } = require('../js/diarios.js')
const { getDiaryHumour, getDiaryBadges } = require('../js/insignias.js')

const usuario = 'sergioedo'
const commit = 'main'
getUserDiary(usuario, commit).then((diarioMD) => {
    console.log(getDiaryHumour(diarioMD))
    console.log(getDiaryBadges(diarioMD))
})
