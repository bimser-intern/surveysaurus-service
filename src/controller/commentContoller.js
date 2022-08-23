const CustomError = require('../helper/error/CustomError')
const asyncHandler = require('express-async-handler')
const { addComment } = require('../model/Comment')

const addCommentController = asyncHandler(async (req, res, next) => {
    const { title, comment, parentID } = req.body
    try {
        const { status, data, message } = await addComment({
            email: req.user.email,
            title,
            comment,
            parentID,
        })

        if (!status) return next(new CustomError(message))

        res.status(200).json({
            data: { ...data },
            message: 'Comment is added Succesfully',
        })
    } catch (error) {
        return next(new CustomError(error.message))
    }
})

module.exports = { addCommentController }
