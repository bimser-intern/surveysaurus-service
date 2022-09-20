const CustomError = require('../helper/error/CustomError')
const asyncHandler = require('express-async-handler')
const { createUser, getUser } = require('../model/User')
const { sendJWTUser } = require('../helper/token/token')
const {
    createSurveyModel,
    fillSurveyModel,
    sampleSurveyModel,
    isFilledModel,
    getSurveyModel,
    AllSurveysModel,
    creatorsProfileModel,
} = require('../model/Survey')
const { request } = require('express')

//create survey
const createSurvey = asyncHandler(async (req, res, next) => {
    const { title, question, choice } = req.body
    try {
        const { status, data, message } = await createSurveyModel({
            email: req.user.email,
            title,
            question,
            choice,
        })

        if (!status) {
            return next(new CustomError(message))
        }

        return res.status(200).json({
            data: {},
            message: 'Survey created',
        })
    } catch (error) {
        return next(new CustomError(error.message))
    }
})

// Fill Survey

const fillSurvey = asyncHandler(async (req, res, next) => {
    const { title, answer } = req.body
    try {
        const { status, data, message } = await fillSurveyModel({
            email: req.user.email,
            title,
            answer,
        })

        if (!status) return next(new CustomError(message))

        res.status(200).json({ data: {}, message: 'Survey filled' })
    } catch (error) {
        return next(new CustomError(error.message))
    }
})

// Sample Survey

const sampleSurvey = asyncHandler(async (req, res, next) => {
    const { count } = req.query

    try {
        const { status, data, message } = await sampleSurveyModel({
            count: count || 3,
        })

        if (!status) return next(new CustomError(message))

        res.status(200).json({
            data: { surveys: data.surveys },
            message: 'Survey filled',
        })
    } catch (error) {
        return next(new CustomError(error.message))
    }
})

// Sample Survey

const allSurveys = asyncHandler(async (req, res, next) => {
    const { queue } = req.query

    try {
        const { status, data, message } = await AllSurveysModel({
            queue: queue,
        })

        if (!status) return next(new CustomError(message))

        res.status(200).json({
            data: { surveys: data.surveys, isLast: data.isLast },
            message: message,
        })
    } catch (error) {
        return next(new CustomError(error.message))
    }
})
// survey is filled controller ?

const isfilled = asyncHandler(async (req, res, next) => {
    const { title } = req.body
    try {
        const { status, data, message } = await isFilledModel({
            email: req.user.email,
            title,
        })

        if (!status) return next(new CustomError(message))

        res.status(200).json({
            data: { ...data },
            message: 'Anket daha önce işaretlenmiş',
        })
    } catch (error) {
        return next(new CustomError(error.message))
    }
})

// get single survey

const getSurvey = asyncHandler(async (req, res, next) => {
    const { title } = req.body
    try {
        const { status, data, message } = await getSurveyModel({
            title,
        })

        if (!status) return next(new CustomError(message))

        res.status(200).json({
            data: { ...data },
            message: 'Anket alındı',
        })
    } catch (error) {
        return next(new CustomError(error.message))
    }
})

const creatorsProfile = asyncHandler(async (req, res, next) => {
    const { author } = req.body
    try {
        const { status, data, message } = await creatorsProfileModel({
            author,
        })
        if (!status) return next(new CustomError(message))

        res.status(200).json({
            data: { ...data },
            message: message,
        })
    } catch (error) {
        return next(new CustomError(error.message))
    }
})
module.exports = { createSurvey, fillSurvey, sampleSurvey, isfilled, getSurvey, allSurveys, creatorsProfile }

//
