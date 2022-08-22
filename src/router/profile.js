const router = require('express').Router()
const yupValidate = require('../middleware/yup/yup')
const {
    UpdateUserSchema,
    GetUserInfoSchema,
} = require('../schema/ProfileSchema')
const { tokenControl } = require('../middleware/token/tokenControl')
const {} = require('../controller/profileController')

router.get('/getUserInfo', [tokenControl, yupValidate(GetUserInfoSchema)])

router.put('/updateUserInfo', [tokenControl, yupValidate(UpdateUserSchema)])

module.exports = router
