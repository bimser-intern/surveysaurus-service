const Yup = require('yup')

module.exports = {
    configSchema: Yup.object({
        NEO4J_USERNAME: Yup.string().required(),
        NEO4J_USER_PASS: Yup.string().required(),
        NEO4J_HOST: Yup.string().required(),
        AURA_INSTANCENAME: Yup.string().required(),
        PORT: Yup.string().required(),
        JWT_SECRET_KEY: Yup.string().required(),
        JWT_EXPIRE: Yup.string().required(),
    }),
}
