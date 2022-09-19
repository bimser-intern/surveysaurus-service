const jwt = require('jsonwebtoken')
const { JWT_EXPIRE, JWT_SECRET_KEY } = require('../../config')

const generateJWTFromUser = (user) => {
    const payload = {
        email: user.email,
        exp: Date.now() + parseInt(JWT_EXPIRE),
        authTime: Date.now(),
    }

    return jwt.sign(payload, JWT_SECRET_KEY)
}

module.exports = {
    isTokenIncluded: (req) => req.headers.authorization == undefined,

    getTokenFromCookie: (req) => req.headers.authorization,

    sendJWTUser: (user, res, message) => {
        const token = generateJWTFromUser(user)

        res.status(200)
            .cookie('accessToken', token, {
                httpOnly: true,
                secure: true,
                expires: new Date(Date.now() + parseInt(JWT_EXPIRE)),
            })
            .json({
                accessToken: token,

                data: {
                    name: user.name,
                    gender: user.gender,
                    email: user.email,
                    city: user.city,
                    country: user.country,
                    point: user.point
                },
                message: message || 'Giriş Yapıldı',
            })
    },
}
