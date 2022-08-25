const router = require('express').Router()
const { tokenControl, userControl } = require('../middleware/token/tokenControl')
const yupValidate = require('../middleware/yup/yup')
const { addCommentController, getCommentsController } = require('../controller/commentContoller')
const { addCommentSchema, getCommentsSchema } = require('../schema/commentSchema')
const { upVoteSchema } = require('../schema/commentSchema')
const { upVoteController } = require('../controller/commentContoller')
const { reportSchema } = require('../schema/commentSchema')
const { reportController } = require('../controller/commentContoller')

router.post('/addcomment', [tokenControl, userControl, yupValidate(addCommentSchema)], addCommentController)
router.post('/upVote', [tokenControl, userControl, yupValidate(upVoteSchema)], upVoteController)

router.post('/report', [tokenControl, userControl, yupValidate(reportSchema)], reportController)

router.post('/comments', [tokenControl, userControl, yupValidate(getCommentsSchema)], getCommentsController)

module.exports = router
