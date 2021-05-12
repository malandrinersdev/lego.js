const { obtenerDiarioUsuario } = require('../js/diarios.js')
const {
    obtenerHumorDiario,
    calcularInsigniasDiario,
} = require('../js/insignias.js')

const usuario = 'sergioedo'
const commit = 'main'
obtenerDiarioUsuario(usuario, commit).then((diarioMD) => {
    console.log(obtenerHumorDiario(diarioMD))
    console.log(calcularInsigniasDiario(diarioMD))
})
