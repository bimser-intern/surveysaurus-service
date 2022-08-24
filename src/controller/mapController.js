const CustomError = require('../helper/error/CustomError')
const asyncHandler = require('express-async-handler')
const { returnMapModel } = require('../model/map')

const getMapValuesController = asyncHandler(async (req, res, next) => {
    const { title } = req.body
    try {
        const {
            status,
            data: { mapValue },
            message,
        } = await returnMapModel({
            title,
        })

        if (!status) return next(new CustomError(message))

        res.status(200).json({
            data: { mapValue },
            message: 'Map Values listed successfully',
        })
    } catch (error) {
        return next(new CustomError(error.message))
    }
})

module.exports = {
    getMapValuesController,
}
