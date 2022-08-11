const asyncHandler = require('express-async-handler')
const CustomError = require('../../helper/error/CustomError')
const {
    isTokenIncluded,
    getTokenFromCookie,
} = require('../../helper/token/token')

const jwt = require('jsonwebtoken')

module.exports = {
    tokenControl: asyncHandler((req, res, next) => {
        const { JWT_SECRET_KEY } = process.env

        if (!isTokenIncluded(req))
            return next(
                new CustomError(
                    'You are not authorized, Please login an account',
                    401
                )
            )

        const token = getTokenFromCookie(req)

        jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
            if (err) next(new CustomError('You authorize is invalid', 401))

            req.user = {
                email: decoded.email,
            }

            return next()
        })
    }),
}
