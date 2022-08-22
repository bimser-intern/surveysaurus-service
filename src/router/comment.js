const router = require('express').Router()
const yupValidate = require('../middleware/yup/yup')
const { addComment } = require('../model/Comment')
const {
    addCommentSchema,
} = require('../schema/commentSchema')

router.post('/addComment', [tokenControl, yupValidate(addCommentSchema)], addComment)

