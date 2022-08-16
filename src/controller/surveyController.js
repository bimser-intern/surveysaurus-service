const CustomError = require('../helper/error/CustomError')
const asyncHandler = require('express-async-handler')
const { createUser, getUser } = require('../model/User')
const { sendJWTUser } = require('../helper/token/token')
const {createSurveyModel,fillSurveyModel} = require("../model/Survey")
const { request } = require('express')

//create survey
const createSurvey = asyncHandler(async (req, res, next) => {
    const {title, question, choice } = req.body
    try {

        
        const { status, data, message } = await createSurveyModel({
            email: req.user.email,
            title,
            question,
            choice,
        })

        if (!status){
            return next(new CustomError(message))
        }

        return res.status(200).json({
            data: {},
            message: 'Survey created',
        })

    } catch (error) {
        return next(new CustomError(message))
    }
})

// Fill Survey

const fillSurvey = asyncHandler(async (req, res, next) => {
    const {title, answer } = req.body
    try {
        const { status, data, message } = await fillSurveyModel({
            email:req.user.email,
            title,
            answer,
            
        })
    

        if (!status) return next(new CustomError(message))

        res.status(200).json({body:{},message:"Survey filled"})

    } catch (error) {
        return next(new CustomError(message))
    }
})


module.exports = { createSurvey, fillSurvey }

//