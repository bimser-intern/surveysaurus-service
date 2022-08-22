const Yup = require('yup')

module.exports = {
  
    addCommentSchema: Yup.object({
        body: Yup.object({
            title: Yup.string().required(),
            comment: Yup.string('please be kindly in write comment').required(),
            parentID: Yup.number().required(),
        }),
        query: Yup.object({}),
        params: Yup.object({}),
    }),

}