const router = require('express').Router()
const yupValidate = require('../middleware/yup/yup')
const {
    createSurveySchema,
    fillSurveySchema,
    sampleSurveySchema,
    getSurveySchema,
    allSurveysSchema,
} = require('../schema/SurveySchema')
const {
    tokenControl,
    userControl,
} = require('../middleware/token/tokenControl')
const {
    createSurvey,
    fillSurvey,
    sampleSurvey,
    getSurvey,
    allSurveys,
} = require('../controller/surveyController')
const { isfilled } = require('../controller/surveyController')
const { isFilledSchema } = require('../schema/SurveySchema')

router.post(
    '/createSurvey',
    [tokenControl, userControl, yupValidate(createSurveySchema)],
    createSurvey
)

router.post(
    '/fillSurvey',
    [tokenControl, userControl, yupValidate(fillSurveySchema)],
    fillSurvey
)

router.get('/sample', [yupValidate(sampleSurveySchema)], sampleSurvey)
router.get('/allsurveys', [yupValidate(allSurveysSchema)], allSurveys)

router.post(
    '/isfilled',
    [tokenControl, userControl, yupValidate(isFilledSchema)],
    isfilled
)

router.post('/getSurvey', [yupValidate(getSurveySchema)], getSurvey)

module.exports = router
//
