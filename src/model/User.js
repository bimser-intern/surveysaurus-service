const { executeCypherQuery } = require('../helper/db/dbHelper')

module.exports = {
    /*
   Create user model
  */
    createUser: async ({ userName, email, gender, country, city, password }) => {
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
                const writeQuery = `MATCH (m:Country) WHERE m.name = '${country}'
                CREATE (p1:User {name: '${userName}', email: '${email}', gender: '${gender}', country: '${country}', city: '${city}', password: '${password}', point : 30})
                WITH p1,m
                MATCH (i:Icon) WHERE i.name = "polar"
                CREATE (p1)-[:PP]->(i)
                CREATE (p1)-[:LIVES]->(m) RETURN p1`
                const writeResult = await executeCypherQuery(writeQuery)
                return {
                    status: true,
                    data: {},
                    message: 'User created successfully',
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
                const readQuery = `MATCH(n:User) WHERE n.email = '${email}' AND n.password = '${password}' RETURN n.name + "|"+ n.email+ "|"+n.gender+ "|"+n.country+ "|"+n.city + "|"+n.point AS result`
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
                            point: array[5],
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

    mysurveys: async ({ email }) => {
        try {
            const writeQuery = `MATCH (n:User)-[:CREATED]->(m:Survey) WHERE n.email = "${email}"  RETURN m`
            const writeResult = await executeCypherQuery(writeQuery)

            const surveys2 = writeResult.records.map((_record) => _record.get('m').properties)
            const counts = surveys2[0].counts
            let percent = []
            const sumcounts = counts.reduce((partialSum, a) => partialSum + a, 0)
            for (let i = 0; i < counts.length; i++) {
                percent[i] = Math.round((counts[i] / sumcounts) * 1000) / 10
            }
            const surveys = surveys2.map((_surveys2) => ({
                ..._surveys2,
                percent: percent,
            }))
            return {
                status: true,
                data: { surveys },
                message: 'Survey listed successfully',
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

    countryListModel: async ({}) => {
        try {
            const writeQuery = `MATCH (n:Country) RETURN n.name AS m ORDER BY m`
            const writeResult = await executeCypherQuery(writeQuery)
            const countries = writeResult.records.map((_record) => _record.get('m'))
            return {
                status: true,
                data: { countries },
                message: 'Countries listed successfully',
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

    cityListModel: async ({ country }) => {
        try {
            const writeQuery = `MATCH (a)-[r:LOCATED]->(n) WHERE n.name ="${country}" RETURN a ORDER BY a.name`
            const writeResult = await executeCypherQuery(writeQuery)
            const cities = writeResult.records.map((_record) => _record.get('a').properties.name)
            return {
                status: true,
                data: { cities },
                message: 'Cities listed successfully',
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
