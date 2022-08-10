const Yup = require('yup')

module.exports = {
    testSchema: Yup.object({
        body: Yup.object({
            email: Yup.string().email().required(),
            title: Yup.string().required(),
        }),
        query: Yup.object({}),
        params: Yup.object({}),
    }),

    loginSchema: Yup.object({
        body: Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().min(5).required(),
        }),
        query: Yup.object({}),
        params: Yup.object({}),
    }),
}
