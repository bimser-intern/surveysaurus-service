const { executeCypherQuery } = require('../helper/db/dbHelper')

module.exports = {
    /*
   Create user model
  */
    createUser: async ({
        userName,
        email,
        gender,
        country,
        city,
        password,
    }) => {
        try {
            let a = false
            const Query = `MATCH(n:User ) WHERE n.email = '${email}' OR n.name = '${userName}' RETURN count(n) AS result`
            const Result = await executeCypherQuery(Query)
            Result.records.forEach((record) => {
                if (record.get('result') > 0) {
                    a = true
                }
            })

            if (a == 0) {
                const writeQuery = `CREATE (p1:User {name: '${userName}', email: '${email}', gender: '${gender}', country: '${country}', city: '${city}', password: '${password}'})
                              RETURN p1`
                const writeResult = await executeCypherQuery(writeQuery)

                for (const record of writeResult.records) {
                    const person1Node = record.get('p1')
                    return {
                        status: true,
                        data: {},
                        message: 'User created successfully',
                    }
                }
            } else {
                return {
                    status: false,
                    data: {},
                    message: 'Error: User name or email existing...',
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
    },

    /*
    login model
  */
    getUser: async ({ email, password }) => {
        try {
            let a = false
            const Query = `MATCH(n:User) WHERE n.email = '${email}' AND n.password = '${password}' RETURN count(n) AS result`
            const Result = await executeCypherQuery(Query)
            Result.records.forEach((record) => {
                if (record.get('result') > 0) {
                    a = true
                }
            })

            if (a) {
                const readQuery = `MATCH(n:User) WHERE n.email = '${email}' AND n.password = '${password}' RETURN n.name + "|"+ n.email+ "|"+n.gender+ "|"+n.country+ "|"+n.city AS result`
                const readResult = await executeCypherQuery(readQuery, {
                    email,
                    password,
                })

                for (const record of readResult.records) {
                    const array = record.get('result').split('|')
                    return {
                        status: true,
                        data: {
                            name: array[0],
                            email: array[1],
                            gender: array[2],
                            country: array[3],
                            city: array[4],
                        },
                        message: '',
                    }
                }
            } else {
                return {
                    status: false,
                    data: {},
                    message: "User didn't find",
                }
            }
        } catch (error) {
            return {
                status: false,
                data: {},
                message: `Something went wrong: ${error.message}`,
            }
        }
    },

    // my surveys model

    mysurveys: async ({
        email,
    }) => {
        try {     
                const writeQuery = `MATCH (n:User)-[:CREATED]->(m:Survey) WHERE n.email = "${email}"  RETURN m`
                const writeResult = await executeCypherQuery(writeQuery)
                for (const record of writeResult.records) {
                    const survey1Node = record.get('m')
                    return {
                        status: true,
                        data: {survey1Node},
                        message: 'Survey listed successfully',
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
    },

    // 

}


