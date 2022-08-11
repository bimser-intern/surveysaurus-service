const CustomError = require('../../helper/error/CustomError')

const customErrorHandler = (err, req, res, next) => {
    let customError = err

    res.status(customError.statusCode || 400).json({
        data: {},
        message: customError.message,
    })
}

module.exports = customErrorHandler
