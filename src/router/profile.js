const router = require('express').Router()
const yupValidate = require('../middleware/yup/yup')
const {
    UpdateUserSchema,
    GetUserInfoSchema,
} = require('../schema/ProfileSchema')
const { tokenControl } = require('../middleware/token/tokenControl')
const {} = require('../controller/profileController')

router.get('/getInfo', [tokenControl, yupValidate(GetUserInfoSchema)])

router.put('/update', [tokenControl, yupValidate(UpdateUserSchema)])

module.exports = router
