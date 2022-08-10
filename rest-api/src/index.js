const express = require('express')
const dotenv = require('dotenv')
const router = require('./router')
const customErrorHandler = require('./middleware/error/customErrorHandler')
dotenv.config()

console.log(process.env.NEO4J_USER_PASS)

// connect database

const app = express()

// * middleware
//      -cors
//      -json
app.use(express.json())

// routing
app.use('/api', router)
app.use(customErrorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`${PORT} is listened successfuly`)
})
