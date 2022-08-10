const CustomError = require('../../helper/error/CustomError')

const customErrorHandler = (err, req, res, next) => {
    let customError = err

    res.status(customError.statusCode || 200).json({
        status: false,
        message: customError.message,
    })
}

module.exports = customErrorHandler
