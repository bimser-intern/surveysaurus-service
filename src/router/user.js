const router = require('express').Router()
const yupValidate = require('../middleware/yup/yup')
const {
    loginSchema,
    registerSchema,
    getCountriesSchema,
    getCitiesSchema,
} = require('../schema/UserSchema')
const {
    login,
    register,
    getCities,
    getCountries,
} = require('../controller/userController')
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

router.get('/countries', [yupValidate(getCountriesSchema)], getCountries)

router.post('/cities', [yupValidate(getCitiesSchema)], getCities)

module.exports = router
