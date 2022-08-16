const Yup = require('yup')

module.exports = {
    createSurveySchema: Yup.object({
        body: Yup.object({
            surveyQuestionTitle: Yup.string().surveyQuestionTitle().required(),
            surveyQuestion: Yup.string().surveyQuestion().required(),
            questionTrueChoice: Yup.string().questionTrueChoice().required(),
            choiceNumber: Yup.string().choiceNumber().required(),
            choice: Yup.string().choice().required(),
        }),
        query: Yup.object({}),
        params: Yup.object({}),
    }),

    fillSurveySchema: Yup.object({
        body: Yup.object({
            email: Yup.string().email().required(),
            surveyQuestionTitle: Yup.string().surveyQuestionTitle().required(),
            answer: Yup.string().answer().required(),

        }),
        query: Yup.object({}),
        params: Yup.object({}),
    }),
}
//