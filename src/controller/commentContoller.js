const CustomError = require('../helper/error/CustomError')
const asyncHandler = require('express-async-handler')
const { createUser, getUser } = require('../model/User')
const { sendJWTUser } = require('../helper/token/token')
const {
    addCommentController,
} = require('../model/Comment')
const { request } = require('express')

const addCommentController = asyncHandler(async (req, res, next) => {
    const { title, comment, parentID } = req.body
    try {
        const { status, data, message } = await addComment({
            email: req.user.email,
            title:title,
            comment:comment,
            parentID:parentID,
        })

        if (!status) return next(new CustomError(message))

        res.status(200).json({ data: {}, message: 'Comment Add Succesfully' })
    } catch (error) {
        return next(new CustomError(error.message))
    }
})

module.exports = {addCommentController, }