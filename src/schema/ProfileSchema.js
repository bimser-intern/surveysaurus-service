const Yup = require('yup')

module.exports = {
    GetUserInfoSchema: Yup.object({
        body: Yup.object({}),
        query: Yup.object({}),
        params: Yup.object({}),
    }),
     UpdateUserSchema: Yup.object({
        body: Yup.object({
            userName: Yup.string().required(),
            email: Yup.string().email().required(),
            city: Yup.string().required(),
            country: Yup.string().required(),
            gender: Yup.string(),
        }),
        query: Yup.object({}),
        params: Yup.object({}),
    }),
    UpdatePasswordSchema: Yup.object({
        body: Yup.object({
            oldPassword: Yup.string().required(),
            newPassword: Yup.string().required()
        }),
        query: Yup.object({}),
        params: Yup.object({}),
    }),
    UpdateIconSchema: Yup.object({
        body: Yup.object({
            icon: Yup.string().required()
        }),
        query: Yup.object({}),
        params: Yup.object({}),
    }),
}

