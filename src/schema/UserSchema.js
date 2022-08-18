const Yup = require('yup')

module.exports = {
    loginSchema: Yup.object({
        body: Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
        }),
        query: Yup.object({}),
        params: Yup.object({}),
    }),

    registerSchema: Yup.object({
        body: Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
            city: Yup.string().required(),
            country: Yup.string().required(),
            userName: Yup.string().required(),
            gender: Yup.string().required(),
        }),
        query: Yup.object({}),
        params: Yup.object({}),
    }),

    mySurveysSchema: Yup.object({
        body: Yup.object({}),
        query: Yup.object({}),
        params: Yup.object({}),
    }),

    getCountriesSchema: Yup.object({
        body: Yup.object({}),
        query: Yup.object({}),
        params: Yup.object({}),
    }),
    getCitiesSchema: Yup.object({
        body: Yup.object({
            country: Yup.string().required(),
        }),
        query: Yup.object({}),
        params: Yup.object({}),
    }),
}
