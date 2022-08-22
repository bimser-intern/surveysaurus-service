const router = require('express').Router()
const yupValidate = require('../middleware/yup/yup')
const {
    UpdateUserSchema,
    GetUserInfoSchema,
} = require('../schema/ProfileSchema')
const { tokenControl } = require('../middleware/token/tokenControl')
const {} = require('../controller/profileController')
const { UpdatePasswordSchema } = require('../schema/ProfileSchema')
const { updateUser } = require('../controller/profileController')
const { updatePass } = require('../controller/profileController')
const { getProfile } = require('../controller/profileController')

router.get('/getInfo', [tokenControl, yupValidate(GetUserInfoSchema)],getProfile)
router.put('/updatepassword', [tokenControl, yupValidate(UpdatePasswordSchema)],updatePass)
router.post('/update', [tokenControl, yupValidate(UpdateUserSchema)],updateUser)

module.exports = router
