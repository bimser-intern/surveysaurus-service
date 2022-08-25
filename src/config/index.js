const dotenv = require('dotenv')

if (process.env.NODE_ENV !== 'prod') {
    dotenv.config()
}

module.exports = {
    PORT: process.env.PORT,
    NEO4J_USER_PASS: process.env.NEO4J_USER_PASS,
    NEO4J_USERNAME: process.env.NEO4J_USERNAME,
    NEO4J_HOST: process.env.NEO4J_HOST,
    AURA_INSTANCENAME: process.env.AURA_INSTANCENAME,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    JWT_EXPIRE: process.env.JWT_EXPIRE,
}
