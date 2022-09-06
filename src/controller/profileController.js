const CustomError = require('../helper/error/CustomError')
const asyncHandler = require('express-async-handler')
const {
    updateUserInfoModel,
    getUserInfoModel,
    updatePasswordModel,
    updateIconModel,
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

    updateIcon: asyncHandler(async (req, res, next) => {
        const { icon } = req.body
        try {
            if(!["bear","bird","dog","fox","green","koala","lion","polar","purple"].includes(icon)){
                return next(new CustomError("Please send a valid icon name"))
            }
            else{
                const { status, data, message } = await updateIconModel({
                    email: req.user.email,
                    icon:icon,
                })
                if (!status) return next(new CustomError(message))
    
                res.status(200).json({
                    data: {},
                    message: 'Icon updated',
                })
            }            
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
