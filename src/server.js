const express = require('express')
const path = require('path')
const responseTime = require('response-time')
const badgesAPIRoutes = require('./api/badges')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')

dotenv.config()

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
app.use('/badges', badgesAPIRoutes)

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
