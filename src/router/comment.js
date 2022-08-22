const router = require('express').Router()
const { tokenControl } = require('../middleware/token/tokenControl')
const yupValidate = require('../middleware/yup/yup')
const { addCommentController } = require('../controller/commentContoller')
const { addCommentSchema } = require('../schema/commentSchema')

router.post(
    '/addcomment',
    [tokenControl, yupValidate(addCommentSchema)],
    addCommentController
)

module.exports = router
