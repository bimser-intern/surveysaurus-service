const Yup = require('yup')

module.exports = {
    createSurveySchema: Yup.object({
        body: Yup.object({
            username: Yup.string().required(),
            title: Yup.string().required(),
            question: Yup.string().required(),
            choice: Yup.string().required(),
        }),
        query: Yup.object({}),
        params: Yup.object({}),
    }),

    fillSurveySchema: Yup.object({
        body: Yup.object({
            username: Yup.string().required(),
            title: Yup.string().required(),
            answer: Yup.string().required(),
        }),
        query: Yup.object({}),
        params: Yup.object({}),
    }),
}
//