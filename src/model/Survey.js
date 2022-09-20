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
        // let a = false
        // const Query = `MATCH(n:Survey) WHERE n.title = "${title}" RETURN count(n) AS result`
        // const Result = await executeCypherQuery(Query)
        // Result.records.forEach((record) => {
        //     if (record.get('result') > 0) {
        //         a = true
        //     }
        // })

        // if (!a) {
        var counts = []
        for (let i = 0; i < choice.length; i++) {
            counts.push(0)
        }
        const writeQuery = `MATCH(n:Survey) WITH count(n) as c MATCH (m:User) WHERE m.email= "${email}"
            CREATE (p1:Survey {title: apoc.text.format("${title} #%d", [c + 1]), question: "${question}",  choices : ${JSON.stringify(choice)},
            counts : ${JSON.stringify(counts)}})
            CREATE (m)-[r:CREATED]->(p1)
            SET m.point = m.point +20
            RETURN p1`

        const writeResult = await executeCypherQuery(writeQuery)

        for (const record of writeResult.records) {
            const survey1Node = record.get('p1')

            console.log(survey1Node)

            return {
                status: true,
                data: {},
                message: 'Survey created successfully',
            }
        }
        // } else {
        //     return {
        //         status: false,
        //         data: {},
        //         message: 'Error: Survey Title existing...',
        //     }
        // }
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
const getSurveyModel = async ({ title }) => {
    try {
        const writeQuery = `MATCH (n:Survey) WHERE n.title = "${title}" 
        MATCH (u:User)-[:CREATED]->(n) RETURN n.question AS q, n.choices AS ch, n.counts AS count, COUNT(n) as c, u.name AS u`
        const writeResult = await executeCypherQuery(writeQuery)

        if (!writeResult.records[0]?.get('c')) throw Error('Survey is not found!')

        const question = writeResult.records[0]?.get('q')

        const choice = writeResult.records.map((_record) => _record.get('ch'))[0]
        const counts = writeResult.records.map((_record) => _record.get('count'))[0]
        const author = writeResult.records.map((_record) => _record.get('u'))[0]
        let percent = []
        const sumcounts = counts.reduce((partialSum, a) => partialSum + a, 0)
        for (let i = 0; i < counts.length; i++) {
            percent[i] = Math.round((counts[i] / sumcounts) * 1000) / 10
        }
        return {
            status: true,
            data: { question, choice, counts, percent, author },
            message: 'Survey sended successfully',
        }
    } catch (error) {
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
            WITH m,n,r
            MATCH (u:User)-[:CREATED]->(m) SET u.point = u.point + 5
            WITH m,n,r,u
            MATCH ()-[v:VOTED]->(m) WITH floor(COUNT(v)/100)-floor((COUNT(v)-1)/100) AS v, m, u
            SET u.point = u.point+v*50
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

        const writeQuery = `MATCH (n:Survey) 
        WITH n ORDER BY toInteger(apoc.coll.sum(n.counts)) DESC LIMIT ${count}
        MATCH (u:User)-[:CREATED]->(n)
        MATCH (u)-[:PP]->(i:Icon) 
        RETURN  u.name AS u, i.name AS i, n ORDER BY toInteger(apoc.coll.sum(n.counts)) DESC LIMIT ${count}`
        const writeResult = await executeCypherQuery(writeQuery)
        const surveys2 = writeResult.records.map((_record) => _record.get('n').properties)
        const icons = writeResult.records.map((_record) => _record.get('i'))
        const authors = writeResult.records.map((_record) => _record.get('u'))

        const surveys = surveys2.map((_survey, index) => {
            const sumcounts = _survey.counts.reduce((partialSum, a) => partialSum + a, 0)
            const percent = _survey.counts.map((_count) => Math.round((_count / sumcounts) * 1000) / 10)
            return {
                ..._survey,
                percent: percent,
                icon: icons[index],
                author: authors[index],
            }
        })

        return {
            status: true,
            data: { surveys },
            message: 'Surveys listed successfully',
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

// All Surveys

const AllSurveysModel = async ({ queue }) => {
    try {
        const SurveyCountQuery = `MATCH(s:Survey) RETURN COUNT(s) AS s`
        const SurveyCountQueryResult = await executeCypherQuery(SurveyCountQuery)
        const SurveyCount = SurveyCountQueryResult.records.map((_record) => _record.get('s'))
        let isLast = false        
        if((Math.floor(queue)+1)*13 >= SurveyCount){
            isLast = true
            queue = Math.floor(SurveyCount/13)-1
        }
        else{
            isLast = false
        }
        const writeQuery = `MATCH (n:Survey) 
        MATCH (u:User)-[:CREATED]->(n)
        MATCH (u)-[:PP]->(i:Icon) 
        WITH  u.name AS u, i.name AS i, n, toInteger(apoc.coll.sum(n.counts)) AS a ORDER BY a DESC, n.title ASC LIMIT (${queue}+1)*13
        WITH u,i,n,a ORDER BY a ASC, n.title DESC LIMIT 13
        RETURN u,i,n ORDER BY a DESC, n.title ASC`
        const writeResult = await executeCypherQuery(writeQuery)
        const surveys2 = writeResult.records.map((_record) => _record.get('n').properties)
        const icons = writeResult.records.map((_record) => _record.get('i'))
        const authors = writeResult.records.map((_record) => _record.get('u'))
        const surveys = surveys2.map((_survey, index) => {
            const sumcounts = _survey.counts.reduce((partialSum, a) => partialSum + a, 0)
            const percent = _survey.counts.map((_count) => Math.round((_count / sumcounts) * 1000) / 10)
            return {
                ..._survey,
                percent: percent,
                icon: icons[index],
                author: authors[index],
            }
        })
        return {
            status: true,
            data: { surveys, isLast },
            message: `Surveys listed successfully`,
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

//CreatorsProfile

const creatorsProfileModel = async ({ author }) => {
    try {
        const writeQuery = `MATCH (n:User) WHERE n.name = "${author}" 
        MATCH (n)-[r:CREATED]->(s:Survey)
        RETURN n.point AS n, COUNT(r) AS c, s`
        const writeResult = await executeCypherQuery(writeQuery)
        const point = writeResult.records.map((_rec) => _rec.get('n'))[0]
        const surveycount = writeResult.records.map((_rec) => _rec.get('c')).reduce((a, b) => a + b, 0)
        const surveys = writeResult.records.map((_rec) => _rec.get('s').properties)
        return {
            status: true,
            data: { point, surveycount, surveys },
            message: `User profile returned`,
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
    AllSurveysModel,
    creatorsProfileModel,
}
