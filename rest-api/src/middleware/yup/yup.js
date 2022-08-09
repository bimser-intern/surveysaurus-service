const CustomError = require('../../helper/error/CustomError')

const validate = (schema) => async (req, res, next) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
        })
        return next()
    } catch (err) {
        console.log(err)
        return next(new CustomError('Invalid Request', 400))
    }
}

module.exports = validate
