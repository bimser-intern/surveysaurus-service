const { executeCypherQuery } = require('../helper/db/dbHelper')


// Create Survey
createSurvey: async ({
    surveyQuestionTitle,
    surveyQuestion,
    questionTrueChoice,
    choiceNumber,
    choice = [],
    

}) => {
    try {
        let a = false
        const Query = `MATCH(n:surveyQuestionTitle ) WHERE n.surveyQuestion = '${surveyQuestion}' OR n.surveyQuestionTitle = '${surveyQuestionTitle}' RETURN count(n) AS result`
        const Result = await executeCypherQuery(Query)
        Result.records.forEach((record) => {
            if (record.get('result') > 0) {
                a = true
            }
        })

        if (a == 0) {
            const writeQuery = `CREATE (p1:survey {Survey Question Title: '${surveyQuestionTitle}', Survey Question: '${surveyQuestion}', Question True Choice: '${questionTrueChoice}', Choice Number: '${choiceNumber}', Choices : [ ] })
                          RETURN p1`
            const writeResult = await executeCypherQuery(writeQuery)

            for (const record of writeResult.records) {
                const survey1Node = record.get('p1')
                return {
                    status: true,
                    data: {},
                    message: 'Survey created successfully',
                }
            }
        } else {
            return {
                status: false,
                data: {},
                message: 'Error: Survey Question or Survey Title existing...',
            }
        }
    } catch (error) {
        ////////////////////////////////////////////
        return {
            status: false,
            data: {},
            message: `Something went wrong: ${error.message}`,
        }
    }
}


// Fill Survey 

fillSurvey: async ({
    email,
    surveyQuestionTitle,
    answer,
    

}) => {
    try {
        let a = false
        const Query = `MATCH(n:email ) WHERE n.surveyQuestionTitle = '${surveyQuestionTitle}' OR n.email = '${email}' RETURN count(n) AS result`
        const Result = await executeCypherQuery(Query)
        Result.records.forEach((record) => {
            if (record.get('result') > 0) {
                a = true
            }
        })

        if (a == 0) {
            const writeQuery = `FİLL (p1:surveyFill {Survey Question Title: '${surveyQuestionTitle}', Email: '${email}' , Answer: '${answer}' })
                          RETURN p1`
            const writeResult = await executeCypherQuery(writeQuery)

            for (const record of writeResult.records) {
                const survey1Node = record.get('p1')
                return {
                    status: true,
                    data: {},
                    message: 'Survey filled successfully',
                }
            }
        } else {
            return {
                status: false,
                data: {},
                message: 'Error: Email or Survey Title existing...',
            }
        }
    } catch (error) {
        ////////////////////////////////////////////
        return {
            status: false,
            data: {},
            message: `Something went wrong: ${error.message}`,
        }
    }
}

//