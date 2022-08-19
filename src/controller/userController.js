const CustomError = require('../helper/error/CustomError')
const asyncHandler = require('express-async-handler')
const {
    createUser,
    getUser,
    mysurveys,
    countryListModel,
    cityListModel,
} = require('../model/User')
const { sendJWTUser } = require('../helper/token/token')

/*
    @params
    @description
*/

//login
const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body
    try {
        const { status, data, message } = await getUser({
            email,
            password,
        })

        if (!status) return next(new CustomError(message))

        sendJWTUser(data, res)
    } catch (error) {
        return next(new CustomError(message))
    }
})

/*
    @params
    @description
*/

//register
const register = asyncHandler(async (req, res, next) => {
    const { email, password, city, userName, gender, country } = req.body

    try {
        const { status, data, message } = await createUser({
            userName,
            email,
            password,
            gender,
            city,
            country,
        })

        if (!status) {
            return next(new CustomError(message))
        }

        return res.status(200).json({
            data: {},
            message: 'User oluşturuldu',
        })

        // JWT
    } catch (error) {
        console.log(error)
        return next(new CustomError('Create user içinde hata alındı'))
    }
})

// My Survey Listed Controller

const usersurveys = asyncHandler(async (req, res, next) => {
    try {
        const { status, data, message } = await mysurveys({
            email: req.user.email,
        })

        if (!status) return next(new CustomError(message))

        return res.status(200).json({
            data: {
                surveys: data.surveys,
            },
            message: 'Anketler alındı',
        })

        // sendJWTUser(data, res)
    } catch (error) {
        return next(new CustomError(error.message))
    }
})

const getCountries = asyncHandler(async (req, res, next) => {
    try {
        const { status, data, message } = await countryListModel({})

        if (!status) return next(new CustomError(message))

        return res.status(200).json({
            data: {
                surveys: data.countries,
            },
            message: 'Ülkeler alındı',
        })

        // sendJWTUser(data, res)
    } catch (error) {
        return next(new CustomError(error.message))
    }
})

const getCities = asyncHandler(async (req, res, next) => {
    try {
        const { country } = req.body

        const { status, data, message } = await cityListModel({ country })

        if (!status) return next(new CustomError(message))

        return res.status(200).json({
            data: {
                surveys: data.cities,
            },
            message: 'Şehirler alındı',
        })

        // sendJWTUser(data, res)
    } catch (error) {
        return next(new CustomError(error.message))
    }
})

module.exports = { login, register, usersurveys, getCities, getCountries }
