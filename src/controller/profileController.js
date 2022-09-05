const CustomError = require('../helper/error/CustomError')
const asyncHandler = require('express-async-handler')
const {
    updateUserInfoModel,
    getUserInfoModel,
    updatePasswordModel,
} = require('../model/Profile')
const { sendJWTUser } = require('../helper/token/token')

module.exports = {
    updateUser: asyncHandler(async (req, res, next) => {
        const { userName, email, city, country, gender } = req.body
        try {
            const { status, data, message } = await updateUserInfoModel({
                userName,
                oldEmail: req.user.email,
                newEmail: email,
                city,
                country,
                gender: gender ? gender : undefined,
            })
            if (!status) return next(new CustomError(message))

            sendJWTUser(data.user, res, 'Kullanıcı güncellendi')
        } catch (error) {
            return next(new CustomError(error.message))
        }
    }),

    updatePass: asyncHandler(async (req, res, next) => {
        const { oldPassword, newPassword } = req.body
        try {
            const { status, data, message } = await updatePasswordModel({
                email: req.user.email,
                oldPassword: oldPassword,
                newPassword: newPassword,
            })
            if (!status) return next(new CustomError(message))

            res.status(200).json({
                data: { ...data },
                message: 'Password updated',
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

            console.log(status)

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
