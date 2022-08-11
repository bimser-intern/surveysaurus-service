const express = require('express')
// const dotenv = require('dotenv')
const router = require('./router')
const customErrorHandler = require('./middleware/error/customErrorHandler')
const { connectDB } = require('./helper/db/dbHelper')
// dotenv.config()

connectDB()

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
