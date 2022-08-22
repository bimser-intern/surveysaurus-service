const CustomError = require('../helper/error/CustomError')
const asyncHandler = require('express-async-handler')
const { updateUserInfoModel, getUserInfoModel } = require('../model/Profile')
const { sendJWTUser } = require('../helper/token/token')

module.exports = {
    updateUser: asyncHandler(async (req, res, next) => {
        const { userName, email, city, country } = req.body
        try {
            const { status, data, message } = await updateUserInfoModel({
                userName,
                oldEmail: req.user.email,
                newEmail: email,
                city,
                country,
            })

            if (!status) return next(new CustomError(message))

            sendJWTUser(data.user, res)

            res.status(200).json({
                data: { ...data },
                message: 'Kullanıcı update edildi',
            })
        } catch (error) {
            return next(new CustomError(error.message))
        }
    }),

    getProfile: asyncHandler(async (req, res, next) => {
        try {
            const { status, data, message } = await getUserInfoModel({
                email: req.user.email,
            })

            if (!status) return next(new CustomError(message))

            res.status(200).json({
                data: { ...data },
                message: 'Kullanıcı bulundu',
            })
        } catch (error) {
            return next(new CustomError(error.message))
        }
    }),
}
