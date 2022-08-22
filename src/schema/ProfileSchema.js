const Yup = require('yup')

module.exports = {
    GetUserInfoSchema: Yup.object({
        body: Yup.object({}),
        query: Yup.object({}),
        params: Yup.object({}),
    }),
    UpdateUserSchema: Yup.object({
        body: Yup.object({}),
        query: Yup.object({}),
        params: Yup.object({}),
    }),
}
//
