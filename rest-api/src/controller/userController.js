const CustomError = require('../helper/error/CustomError')
const asyncHandler = require('express-async-handler')
const { createUser, getUser } = require('../model/User')
const { sendJWTUser } = require('../helper/token/token')

/*
    @params
    @description
*/
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

module.exports = { login, register }
