const router = require('express').Router()
const { tokenControl } = require('../middleware/token/tokenControl')
const yupValidate = require('../middleware/yup/yup')
const { addCommentController } = require('../controller/commentContoller')
const { addCommentSchema } = require('../schema/commentSchema')
const { upVoteSchema } = require('../schema/commentSchema')
const { upVoteController } = require('../controller/commentContoller')
const { reportSchema } = require('../schema/commentSchema')
const { reportController } = require('../controller/commentContoller')

router.post(
    '/addcomment',
    [tokenControl, yupValidate(addCommentSchema)],
    addCommentController
)
router.post(
    '/upVote',[tokenControl, yupValidate(upVoteSchema)],upVoteController
)

router.post(
    '/report'[tokenControl, yupValidate(reportSchema)],reportController
)


module.exports = router
