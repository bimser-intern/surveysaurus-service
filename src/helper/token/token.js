const jwt = require('jsonwebtoken')

const generateJWTFromUser = (user) => {
    const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env

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
        const { JWT_EXPIRE } = process.env

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
                },
                message: message || 'Giriş Yapıldı',
            })
    },
}
