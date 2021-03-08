import { obtenerDiarioUsuario } from '../js/diarios.js'
import { obtenerHumorDiario, calcularInsigniasDiario } from '../js/insignias.js'

const usuario = 'sergioedo'
const commit = 'main'
obtenerDiarioUsuario(usuario, commit)
    .then(diarioMD => {
        console.log(obtenerHumorDiario(diarioMD))
        console.log(calcularInsigniasDiario(diarioMD))
    })