const router = require('express').Router()
const { tokenControl, userControl, tokenDecoder } = require('../middleware/token/tokenControl')
const yupValidate = require('../middleware/yup/yup')
const { addCommentController, getCommentsController, deleteController } = require('../controller/commentContoller')
const { addCommentSchema, getCommentsSchema, deleteSchema } = require('../schema/commentSchema')
const { upVoteSchema } = require('../schema/commentSchema')
const { upVoteController } = require('../controller/commentContoller')
const { reportSchema } = require('../schema/commentSchema')
const { reportController } = require('../controller/commentContoller')

router.post('/addcomment', [tokenControl, userControl, yupValidate(addCommentSchema)], addCommentController)
router.post('/upVote', [tokenControl, userControl, yupValidate(upVoteSchema)], upVoteController)

router.post('/report', [tokenControl, userControl, yupValidate(reportSchema)], reportController)

router.post('/comments', [tokenDecoder, yupValidate(getCommentsSchema)], getCommentsController)
router.post('/delete', [tokenControl, userControl, yupValidate(deleteSchema)], deleteController)

module.exports = router
