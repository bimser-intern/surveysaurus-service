const CustomError = require('../helper/error/CustomError')
const asyncHandler = require('express-async-handler')

/*
    @params
    @description
*/
const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body

    res.status(200).json({
        status: true,
        message: 'Giriş Yapıldı',
    })
})

/*
    @params
    @description
*/
const register = asyncHandler(async (req, res, next) => {
    const { email, password, location } = req.body

    res.status(200).json({
        status: true,
        message: 'Kayıt Olundu',
    })
})

module.exports = { login, register }
