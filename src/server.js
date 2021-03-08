import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import responseTime from 'response-time'

import { getUsuarios } from '../js/usuarios.js'
import { obtenerDiarioUsuario } from '../js/diarios.js'
import { calcularInsigniasDiario, obtenerHumorDiario } from '../js/insignias.js'

//we need to change up how __dirname is used for ES6 purposes --> https://github.com/nodejs/help/issues/2907
const __dirname = path.dirname(fileURLToPath(import.meta.url))

//Init express
const app = express()
const port = 3000

// -----------------------------------------------

// Contenido estático
app.use('/html', express.static(path.join(__dirname, '..', 'html')))
app.use('/js', express.static(path.join(__dirname, '..', 'js')))

// Para ver el rendimiento de las peticiones/respuestas
app.use(responseTime((req, res, time) => console.log(req.path, time)))

// API: Insignias de todos los usuarios
app.get('/insignias', (req, res, next) => {
    const usuarios = getUsuarios()
    const commit = 'main'

    const asyncInsignias = usuarios.map(usuario => {
        return obtenerDiarioUsuario(usuario, commit)
            .then(diarioMD => {
                const humor = obtenerHumorDiario(diarioMD)
                const insignias = calcularInsigniasDiario(diarioMD)
                return { usuario, humor, insignias }
            })
    })
    Promise.all(asyncInsignias)
        .then(insignias => {
            const insigniasOrdenadas = insignias.sort((a, b) => (a.usuario.toLowerCase() > b.usuario.toLocaleLowerCase()) ? 1 : -1)
            res.json(insigniasOrdenadas)
        })
        .catch(error => {
            console.log(JSON.stringify(error))
            res.status(500).json({ error: `No se han podido obtener los diarios de los usuarios` })
        })
})

// gestion de error propia, para devolver siempre JSON
app.use(function (err, req, res, next) {
})

// Si llegamos aqui es que la petición no se ha tratado 
app.use(function (req, res) {
    res.status(404).json({ error: "Aquí no hay nada de nada...sigue buscando..." })
})

// -----------------------------------------------

// Start Server
app.listen(port, () => {
    console.log(`Server started - listening at http://localhost:${port}`)
})