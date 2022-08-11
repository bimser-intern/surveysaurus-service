const CustomError = require('../helper/error/CustomError')
const asyncHandler = require('express-async-handler')
const {createUser , login} = require("../model/User")


/*
    @params
    @description
*/
const login = asyncHandler(async (req, res, next) => {
    const { email, password, } = req.body
    try {
        const { status, data, message } = await login({
            email,
            password,
        })


        if (status === false) {
            return next(new CustomError(message))
          }


      }

     catch (error) {
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

        if (status === false) {
            return next(new CustomError(message))
        }

        // JWT
    } catch (error) {
        return next(new CustomError('Create user içinde hata alındı'))
    }
})

module.exports = { login, register }