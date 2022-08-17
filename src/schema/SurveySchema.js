const Yup = require('yup')

module.exports = {
    createSurveySchema: Yup.object({
        body: Yup.object({
            title: Yup.string().required(),
            question: Yup.string().required(),
            choice: Yup.array().of(Yup.string()).required(),
        }),
        query: Yup.object({}),
        params: Yup.object({}),
    }),

    fillSurveySchema: Yup.object({
        body: Yup.object({
            title: Yup.string().required(),
            answer: Yup.number('please use just number').required(),
        }),
        query: Yup.object({}),
        params: Yup.object({}),
    }),

    sampleSurveySchema: Yup.object({
        body: Yup.object({}),
        query: Yup.object({
            count: Yup.number("number olmalıdır"),
        }),
        params: Yup.object({}),
    }),
}
//
