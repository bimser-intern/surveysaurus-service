const Yup = require('yup')

module.exports = {
    getMapValuesSchema: Yup.object({
        body: Yup.object({}),
        query: Yup.object({
            title: Yup.string().required(),
        }),
        params: Yup.object({}),
    }),
}
