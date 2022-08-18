const { executeCypherQuery } = require('../helper/db/dbHelper')

// Create Survey
// OK

const createSurveyModel = async ({
    email,
    title,
    question,
    choice, //Array
}) => {
    try {
        let a = false
        const Query = `MATCH(n:Survey) WHERE n.title = "${title}" RETURN count(n) AS result`
        const Result = await executeCypherQuery(Query)
        Result.records.forEach((record) => {
            if (record.get('result') > 0) {
                a = true
            }
        })

        if (!a) {
            var counts = []
            for (let i = 0; i < choice.length; i++) {
                counts.push(0)
            }
            const writeQuery = `MATCH (m:User) WHERE m.email= "${email}"
            CREATE (p1:Survey {title: "${title}", question: "${question}",  choices : ${JSON.stringify(
                choice
            )}, counts : ${JSON.stringify(counts)}})
            CREATE (m)-[r:CREATED]->(p1)
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
                message: 'Error: Survey Title existing...',
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

// Get Survey
const getSurveyModel = async ({
    title,
}) => {
    try {
        const writeQuery = `MATCH (n:Survey) WHERE n.title = "${title}" RETURN n.question AS q, n.choices AS ch, n.counts AS count`
        const writeResult = await executeCypherQuery(writeQuery)
        const question = writeResult.get('q')
        const choice = writeResult.records.map(
            (_record) => _record.get('ch').properties
        )
        const counts = writeResult.records.map(
            (_record) => _record.get('count').properties
        )
        return {
            status: true,
            data: {question, choice, counts},
            message: 'Survey sended successfully',
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

const fillSurveyModel = async ({
    email,
    title,
    answer, //as index
}) => {
    try {
        const query = `MATCH (a:User)-[b:VOTED]->(c:Survey) WHERE a.email="${email}" AND c.title = "${title}" RETURN COUNT(b) AS c`
        const runquery = await executeCypherQuery(query)

        const result = runquery.records[0]?.get('c')

        let writeQuery = ''
        if (result == 0) {
            writeQuery = `MATCH (n:User) WHERE n.email="${email}"
            MATCH (m:Survey) WHERE m.title = "${title}"
            CREATE (n)-[r:VOTED {choice : ${answer}}]->(m)
            SET m.counts = apoc.coll.set(m.counts,${answer},m.counts[${answer}]+1)
            RETURN m.title as d`
        } else {
            writeQuery = `MATCH (a:User)-[b:VOTED]->(c:Survey) WHERE a.email="${email}" AND c.title = "${title}"
            SET c.counts = apoc.coll.set(c.counts,toInteger(b.choice),toInteger(c.counts[toInteger(b.choice)])-1)
            SET c.counts = apoc.coll.set(c.counts,${answer},toInteger(c.counts[${answer}])+1)
            SET b.choice = ${answer} RETURN b.choice as d`
        }
        const writeResult = await executeCypherQuery(writeQuery)
        for (const record of writeResult.records) {
            const survey1Node = record.get('d')
            return {
                status: true,
                data: {},
                message: 'Survey filled successfully',
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

// Sample Survey

const sampleSurveyModel = async ({ count }) => {
    try {
        // downgrade
        if (count > 20) count = 20

        const writeQuery = `MATCH (n:Survey) RETURN n.counts ORDER BY toInteger(apoc.coll.sum(n.counts)) DESC LIMIT ${count}`
        const writeResult = await executeCypherQuery(writeQuery)

        const surveys = writeResult.records.map(
            (_record) => _record.get('n').properties
        )

        return {
            status: true,
            data: { surveys },
            message: 'Survey filled successfully',
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

//is filled ?

const isFilledModel = async ({ email, title }) => {
    try {
        const writeQuery = `MATCH (n:User)-[r:VOTED]->(m:Survey) WHERE n.email = "${email}" AND m.title = "${title}" RETURN r.choice as r1`
        const writeResult = await executeCypherQuery(writeQuery)
        for (const record of writeResult.records) {
            const choice = record.get('r1')
            if (choice == null) throw Error('kullanıcı oy vermemiştir')

            return {
                status: true,
                data: { choice },
                message: `Anket daha önce işaretlenmiş cevabı: '${choice}'`,
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

module.exports = {
    fillSurveyModel,
    createSurveyModel,
    sampleSurveyModel,
    isFilledModel,
    getSurveyModel,
}
