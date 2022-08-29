const asyncHandler = require('express-async-handler')
const CustomError = require('../../helper/error/CustomError')
const { isTokenIncluded, getTokenFromCookie } = require('../../helper/token/token')

const jwt = require('jsonwebtoken')
const { getUserInfoModel } = require('../../model/Profile')
const { JWT_SECRET_KEY } = require('../../config')

module.exports = {
    tokenControl: asyncHandler((req, res, next) => {
        if (isTokenIncluded(req)) return next(new CustomError('You are not authorized, Please login an account', 401))

        const token = getTokenFromCookie(req)

        jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
            if (err) next(new CustomError('You authorize is invalid', 401))
            req.user = {
                email: decoded.email,
            }
            return next()
        })
    }),
    tokenDecoder: asyncHandler((req, res, next) => {
        if (!isTokenIncluded(req)) {
            const token = getTokenFromCookie(req)

            try {
                const decoded = jwt.verify(token, JWT_SECRET_KEY)

                req.user = {
                    email: decoded.email,
                }
            } catch (error) {
                console.log(err)
            }
        }
        else{
            req.user = {}
        }       

        return next()
    }),
    userControl: asyncHandler(async (req, res, next) => {
        const { status, data, message } = await getUserInfoModel({
            email: req.user.email,
        })

        if (!status) return next(new CustomError('User is not found!', 401))

        return next()
    }),
}
