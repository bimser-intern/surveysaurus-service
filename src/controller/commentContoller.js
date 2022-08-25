const CustomError = require('../helper/error/CustomError')
const asyncHandler = require('express-async-handler')
const {
    addComment,
    upVote,
    report,
    getCommentsModel,
} = require('../model/Comment')

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

const upVoteController = asyncHandler(async (req, res, next) => {
    const { commentID } = req.body
    try {
        const { status, data, message } = await upVote({
            email: req.user.email,
            commentID,
        })

        if (!status) return next(new CustomError(message))

        res.status(200).json({
            data: { ...data },
            message: 'UpVote Succesfully',
        })
    } catch (error) {
        return next(new CustomError(error.message))
    }
})

const reportController = asyncHandler(async (req, res, next) => {
    const { commentID } = req.body
    try {
        const { status, data, message } = await report({
            email: req.user.email,
            commentID,
        })

        if (!status) return next(new CustomError(message))

        res.status(200).json({
            data: { data },
            message: 'Report Succesfully',
        })
    } catch (error) {
        return next(new CustomError(error.message))
    }
})

const getCommentsController = asyncHandler(async (req, res, next) => {
    const { title } = req.body
    try {
        const { status, data:{comments}, message } = await getCommentsModel({
            title,
        })

        if (!status) return next(new CustomError(message))

        res.status(200).json({
            data: { comments },
            message: 'Comments listed successfully',
        })
    } catch (error) {
        return next(new CustomError(error.message))
    }
})

module.exports = {
    addCommentController,
    upVoteController,
    reportController,
    getCommentsController,
}
