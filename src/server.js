const dotenv = require('dotenv')
dotenv.config()
const app = require('./app')

const port = process.env.PORT || 3000

// Start Server
app.listen(port, () => {
    console.log(`Server started - listening at http://localhost:${port}`)
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
})
