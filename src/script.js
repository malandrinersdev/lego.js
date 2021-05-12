const { obtenerDiarioUsuario } = require('../js/diarios.js')
const { getDiaryHumour, getDiaryBadges } = require('../js/insignias.js')

const usuario = 'sergioedo'
const commit = 'main'
obtenerDiarioUsuario(usuario, commit).then((diarioMD) => {
    console.log(getDiaryHumour(diarioMD))
    console.log(getDiaryBadges(diarioMD))
})
