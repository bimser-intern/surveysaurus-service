const express = require('express')
// const dotenv = require('dotenv')
const router = require('./router')
const customErrorHandler = require('./middleware/error/customErrorHandler')
const { connectDB } = require('./helper/db/dbHelper')
const { configSchema } = require('./schema/configSchema')
const cors = require('cors')
// dotenv.config()

configSchema
    .validate(process.env)
    .then((res) => {
        connectDB()

        // connect database

        const app = express()

        // * middleware
        //      -cors
        //      -json
        app.use(cors())
        app.use(express.json())

        // routing
        app.use('/api', router)
        app.use(customErrorHandler)

        const PORT = process.env.PORT

        app.listen(PORT, () => {
            console.log(`${PORT} is listened successfuly`)
        })
    })
    .catch((err) => {
        console.log('Configuration is failed')
    })
