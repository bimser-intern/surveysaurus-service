const router = require('express').Router()
const yupValidate = require('../middleware/yup/yup')
const { loginSchema } = require('../schema/UserSchema')
const { login, register } = require('../controller/userController')

router.post('/login', [yupValidate(loginSchema)], login)

module.exports = router
