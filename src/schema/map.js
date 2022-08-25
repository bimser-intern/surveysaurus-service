const Yup = require('yup')

module.exports = {
    getMapValuesSchema: Yup.object({
        body: Yup.object({
            title: Yup.string(),
        }),
        query: Yup.object({}),
        params: Yup.object({}),
    }),
}
