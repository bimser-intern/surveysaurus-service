const express = require('express')
const router = require('./router')
const customErrorHandler = require('./middleware/error/customErrorHandler')
const { connectDB } = require('./helper/db/dbHelper')
const { configSchema } = require('./schema/configSchema')
const cors = require('cors')
const { PORT } = require('./config')

configSchema
    .validate(process.env)
    .then((res) => {
        connectDB()

        // connect database

        const app = express()

        // * middleware
        //      -cors
        //      -json
        app.use(
            cors({
                origin: '*',
                credentials: true, //access-control-allow-credentials:true
                optionSuccessStatus: 200,
                methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
                preflightContinue: false,
            })
        )
        app.use(express.json())

        // routing
        app.use('/api', router)
        app.use(customErrorHandler)

        app.listen(PORT, () => {
            console.log(`${PORT} is listened successfuly`)
        })
    })
    .catch((err) => {
        console.log('Configuration is failed')
    })
