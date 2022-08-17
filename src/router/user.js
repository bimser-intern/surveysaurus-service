const router = require('express').Router()
const yupValidate = require('../middleware/yup/yup')
const { loginSchema, registerSchema } = require('../schema/UserSchema')
const { login, register } = require('../controller/userController')
const { mySurveysSchema } = require('../schema/UserSchema')
const { usersurveys } = require('../controller/userController')
const { tokenControl } = require('../middleware/token/tokenControl')
router.post('/login', [yupValidate(loginSchema)], login)

router.post('/register', [yupValidate(registerSchema)], register)

router.get(
    '/mysurveys',
    [tokenControl, yupValidate(mySurveysSchema)],
    usersurveys
)

module.exports = router
