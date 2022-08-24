const router = require('express').Router()
const yupValidate = require('../middleware/yup/yup')
const {
    UpdateUserSchema,
    GetUserInfoSchema,
} = require('../schema/ProfileSchema')
const {
    tokenControl,
    userControl,
} = require('../middleware/token/tokenControl')
const {} = require('../controller/profileController')
const { UpdatePasswordSchema } = require('../schema/ProfileSchema')
const { updateUser } = require('../controller/profileController')
const { updatePass } = require('../controller/profileController')
const { getProfile } = require('../controller/profileController')

router.get(
    '/getinfo',
    [tokenControl, userControl, yupValidate(GetUserInfoSchema)],
    getProfile
)
router.put(
    '/updatepassword',
    [tokenControl, userControl, yupValidate(UpdatePasswordSchema)],
    updatePass
)
router.post(
    '/update',
    [tokenControl, userControl, yupValidate(UpdateUserSchema)],
    updateUser
)

module.exports = router
