const router = require('express').Router()
const yupValidate = require('../middleware/yup/yup')
const { createSurveySchema, fillSurveySchema } = require('../schema/SurveySchema')
const {tokenControl} = require("../middleware/token/tokenControl")
const { createSurvey } = require('../model/Survey.js')
const { fillSurvey } = require('../model/Survey.js')

router.post('/createSurvey', [tokenControl(), yupValidate(createSurveySchema)], createSurvey)

router.post('/fillSurvey', [tokenControl(), yupValidate(fillSurveySchema)], fillSurvey)


module.exports = router
//