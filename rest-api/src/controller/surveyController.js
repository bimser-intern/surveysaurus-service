const CustomError = require('../helper/error/CustomError')
const asyncHandler = require('express-async-handler')
const { createUser, getUser } = require('../model/User')
const { sendJWTUser } = require('../helper/token/token')

//create survey
const createSurvey = asyncHandler(async (req, res, next) => {
    const { surveyQuestionTitle, surveyQuestion, questionTrueChoice, choiceNumber, choice = [], } = req.body
    try {
        const { status, data, message } = await getUser({
            surveyQuestionTitle,
            surveyQuestion,
            questionTrueChoice,
            choiceNumber,
            choice = [],
        })

        if (!status){
            return next(new CustomError(message))
        }

        return res.status(200).json({
            data: {},
            message: 'Anket oluşturuldu',
        })

    } catch (error) {
        return next(new CustomError(message))
    }
})

// Fill Survey

const fillSurvey = asyncHandler(async (req, res, next) => {
    const { email, surveyQuestionTitle, answer, } = req.body
    try {
        const { status, data, message } = await getUser({
            email,
            surveyQuestionTitle,
            answer,
        })

        if (!status) return next(new CustomError(message))

        sendJWTUser(data, res)
    } catch (error) {
        return next(new CustomError(message))
    }
})


module.exports = { createSurvey, fillSurvey }

//