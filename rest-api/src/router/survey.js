const router = require('express').Router()
const yupValidate = require('../middleware/yup/yup')
const { createSurveySchema, fillSurveySchema } = require('../schema/SurveySchema')
const { createSurvey } = require('../controller/userController')
const { fillSurvey } = require('../controller/userController')

router.post('/createSurvey', [yupValidate(createSurveySchema)], createSurvey)

router.post('/fillSurvey', [yupValidate(fillSurveySchema)], fillSurvey)


module.exports = router
//