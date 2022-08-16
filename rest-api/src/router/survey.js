const router = require('express').Router()
const yupValidate = require('../middleware/yup/yup')
const { createSurveySchema, fillSurveySchema } = require('../schema/SurveySchema')
const { createSurvey } = require('../model/Survey.js')
const { fillSurvey } = require('../model/Survey.js')

router.post('/createSurvey', [yupValidate(createSurveySchema)], createSurvey)

router.post('/fillSurvey', [yupValidate(fillSurveySchema)], fillSurvey)


module.exports = router
//