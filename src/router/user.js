const router = require('express').Router()
const yupValidate = require('../middleware/yup/yup')
const { loginSchema, registerSchema } = require('../schema/UserSchema')
const { login, register } = require('../controller/userController')
const { mySurveysSchema } = require('../schema/UserSchema')
const { usersurveys } = require('../controller/userController')

router.post('/login', [yupValidate(loginSchema)], login)

router.post('/register', [yupValidate(registerSchema)], register)

router.post('/mysurveys',[yupValidate(mySurveysSchema)],usersurveys)


module.exports = router
