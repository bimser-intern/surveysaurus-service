const { executeCypherQuery } = require('../helper/db/dbHelper')


// Create Survey   
// OK
createSurvey: async ({
    username,
    title,
    question,
    choice,   //Array

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
            var counts = [];
            for(let i = 0; i<choice.length;i++){
                counts.push(0);
            }
            const writeQuery = `MATCH (m:User) WHERE m.name= "${username}"
            CREATE (p1:Survey {title: "${title}", question: "${question}",  choices : ${JSON.stringify(choice)}, counts : ${JSON.stringify(counts)}})
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


// Fill Survey 

fillSurvey: async ({
    username,
    title,
    answer,  //as index
    

}) => {
    try {     
            const writeQuery = `MATCH (n:User) WHERE n.name="${username}"
            MATCH (m:Survey) WHERE m.title = "${title}"
            CREATE (n)-[r:VOTED {choice : "${answer}"}]->(m)
            SET m.counts = apoc.coll.set(m.counts,${answer},m.counts[${answer}]+1)
            RETURN r`
            const writeResult = await executeCypherQuery(writeQuery)
            for (const record of writeResult.records) {
                const survey1Node = record.get('p1')
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

//