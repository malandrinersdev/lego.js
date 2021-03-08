import { obtenerDiarioUsuario } from './diarios.js'
import { obtenerHumorDiario, calcularInsigniasDiario } from './insignias.js'

const usuario = 'sergioedo'
const commit = 'main'
obtenerDiarioUsuario(usuario, commit)
    .then(diarioMD => {
        console.log(obtenerHumorDiario(diarioMD))
        console.log(calcularInsigniasDiario(diarioMD))
    })