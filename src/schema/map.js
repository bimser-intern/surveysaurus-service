const Yup = require('yup')

module.exports = {
    getMapValuesSchema : Yup.object({
        body: Yup.object({}),
        query: Yup.object({
            title: Yup.string(),
        }),
        params: Yup.object({}),
    }),
}