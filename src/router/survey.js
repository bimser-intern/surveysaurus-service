const router = require('express').Router()
const yupValidate = require('../middleware/yup/yup')
const {
    createSurveySchema,
    fillSurveySchema,
    sampleSurveySchema,
    getSurveySchema,
} = require('../schema/SurveySchema')
const { tokenControl } = require('../middleware/token/tokenControl')
const {
    createSurvey,
    fillSurvey,
    sampleSurvey,
    getSurvey,
} = require('../controller/surveyController')
const { isfilled } = require('../controller/surveyController')
const { isFilledSchema } = require('../schema/SurveySchema')

router.post(
    '/createSurvey',
    [tokenControl, yupValidate(createSurveySchema)],
    createSurvey
)

router.post(
    '/fillSurvey',
    [tokenControl, yupValidate(fillSurveySchema)],
    fillSurvey
)

router.get('/sample', [yupValidate(sampleSurveySchema)], sampleSurvey)

router.post('/isfilled', [tokenControl, yupValidate(isFilledSchema)], isfilled)

router.post('/getSurvey', [yupValidate(getSurveySchema)], getSurvey)

module.exports = router
//
