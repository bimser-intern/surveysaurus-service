const { executeCypherQuery } = require('../helper/db/dbHelper')

const getUserInfoModel = async ({ email }) => {
    try {
        const writeQuery = `MATCH (n:User) WHERE n.email = "${email}" 
        MATCH (n)-[:PP]->(i)
        RETURN n.name AS na, n.gender AS g, n.city AS ci, n.country AS co, n.point as p, i.name AS i`
        const surveyCountQuery = `MATCH (n:User) WHERE n.email = "${email}" MATCH (n)-[r:CREATED]->(s:Survey) RETURN COUNT(r) AS r`
        const writeResult = await executeCypherQuery(writeQuery)
        const surveyCountResult = await executeCypherQuery(surveyCountQuery)
        const surveyCount = surveyCountResult.records[0]?.get('r')
        const name = writeResult.records[0]?.get('na')
        const gender = writeResult.records[0]?.get('g')
        const city = writeResult.records[0]?.get('ci')
        const country = writeResult.records[0]?.get('co')
        const point = writeResult.records[0]?.get('p')
        const icon = writeResult.records[0]?.get('i')

        if (name === undefined) throw Error('User didnt find')

        return {
            status: true,
            data: {
                email: email,
                name: name,
                gender: gender,
                city: city,
                country: country,
                point:point,
                icon:icon,
                surveyCount: surveyCount,
            },
            message: 'User informations returned successfully',
        }
    } catch (error) {
        return {
            status: false,
            data: {},
            message: `Something went wrong: ${error.message}`,
        }
    }
}

const updateUserInfoModel = async ({ oldEmail, userName, newEmail, city, country, gender }) => {
    try {
        const checkQuery = `MATCH (n:User) WHERE n.name = "${userName}" OR n.email = "${newEmail}" RETURN  COUNT (n) AS n, n.email AS email`
        const checkQueryRes = await executeCypherQuery(checkQuery)
        const check = checkQueryRes.records.map((_rec) => _rec.get('n')).reduce((partialSum, a) => partialSum + a, 0)
        const checkEmail = checkQueryRes.records.map((_rec) => _rec.get('email'))
        if (check == 0 || (check == 1 && checkEmail.includes(oldEmail))) {
            let writeQuery
            if (gender == undefined) {
                writeQuery = `MATCH (n:User) WHERE n.email = "${oldEmail}" SET n.name = "${userName}", n.email = "${newEmail}", n.city = "${city}", n.country = "${country}" RETURN n.email AS r`
            } else {
                writeQuery = `MATCH (n:User) WHERE n.email = "${oldEmail}" SET n.name = "${userName}", n.email = "${newEmail}", n.city = "${city}", n.country = "${country}", n.gender = "${gender}" RETURN n.email AS r`
            }
            const writeResult = await executeCypherQuery(writeQuery)
            const email = writeResult.records[0]?.get('r')
            return {
                status: true,
                data: {
                    user: {
                        email,
                    },
                },
                message: 'User informations updated successfully',
            }
        } else {
            return {
                status: false,
                data: {},
                message: 'New username or email is existing',
            }
        }
    } catch (error) {
        return {
            status: false,
            data: {},
            message: `Something went wrong: ${error.message}`,
        }
    }
}

const updateIconModel = async ({
    email,
    icon,
}) => {
    try {
        const writeQuery = `MATCH (n:User) WHERE n.email = "`+email+`" 
        MATCH (n)-[r:PP]->() DELETE r
        WITH n
        MATCH (i:Icon) WHERE i.name = "${icon}"
        CREATE (n)-[k:PP]->(i)
        RETURN COUNT(k) AS r`
        const writeResult = await executeCypherQuery(writeQuery)
        writeResult.records[0]?.get('r')
        return {
            status: true,
            data: {},
            message: 'User icon updated successfully',
        }
    } catch (error) {
        return {
            status: false,
            data: {},
            message: `Something went wrong: ${error.message}`,
        }
    }
}

const updatePasswordModel = async ({ email, oldPassword, newPassword }) => {
    try {
        const writeQuery = `MATCH (n:User) WHERE n.email = "${email}" AND n.password = "${oldPassword}" RETURN COUNT(n) AS r`
        const writeResult = await executeCypherQuery(writeQuery)
        const res1 = writeResult.records[0]?.get('r')
        if (res1 != 0) {
            const Query = `MATCH (n:User) WHERE n.email = "${email}" SET n.password = "${newPassword}" RETURN COUNT(n) AS r`
            const Result = await executeCypherQuery(Query)
            const res = Result.records[0]?.get('r')
            return {
                status: true,
                data: {
                    user: [email],
                },
                message: 'Password updated',
            }
        } else {
            return {
                status: false,
                data: {},
                message: 'Password did not match',
            }
        }
    } catch (error) {
        return {
            status: false,
            data: {},
            message: `Something went wrong: ${error.message}`,
        }
    }
}

module.exports = {
    getUserInfoModel,
    updateUserInfoModel,
    updatePasswordModel,
    updateIconModel
}
