import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import responseTime from 'response-time'
import insigniasAPIRoutes from './insigniasAPI.js'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

dotenv.config()

//we need to change up how __dirname is used for ES6 purposes --> https://github.com/nodejs/help/issues/2907
const __dirname = path.dirname(fileURLToPath(import.meta.url))

//Init express
const app = express()
const port = 3000

// -----------------------------------------------

// Contenido estático
app.use('/html', express.static(path.join(__dirname, '..', 'html')))
app.use('/js', express.static(path.join(__dirname, '..', 'js')))

// Loader.io
app.use('/loaderio-*', (req, res) => {
    res.send(process.env.LOADERIO_VERIFICATION_TOKEN)
})

app.use(bodyParser.urlencoded({ extended: true }))

// Para ver el rendimiento de las peticiones/respuestas
app.use(responseTime((req, res, time) => console.log(req.path, time)))

// API: Insignias de todos los usuarios
app.use('/insignias', insigniasAPIRoutes)

// Si llegamos aqui es que la petición no se ha tratado
app.use(function (req, res) {
    res.status(404).json({
        error: 'Aquí no hay nada de nada...sigue buscando...',
    })
})

// -----------------------------------------------

// Start Server
app.listen(port, () => {
    console.log(`Server started - listening at http://localhost:${port}`)
})
