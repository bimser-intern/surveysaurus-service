const { executeCypherQuery } = require('../helper/db/dbHelper')

const getUserInfoModel = async ({ email }) => {
    try {
        const writeQuery = `MATCH (n:User) WHERE n.email = "${email}" RETURN n.name AS na, n.gender AS g, n.city AS ci, n.country AS co`
        const writeResult = await executeCypherQuery(writeQuery)
        const name = writeResult.records[0]?.get('na')
        const gender = writeResult.records[0]?.get('g')
        const city = writeResult.records[0]?.get('ci')
        const country = writeResult.records[0]?.get('co')

        if (!name) throw Error('User didnt find')
        
        return {
            status: true,
            data: {
                email: email,
                name: name,
                gender: gender,
                city: city,
                country: country,
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

const updateUserInfoModel = async ({
    oldEmail,
    userName,
    newEmail,
    city,
    country,
}) => {
    //Data içerisinde user objesi olacak, email
    try {
        const writeQuery = `MATCH (n:User) WHERE n.email = "${oldEmail}" SET n.name = "${userName}", n.email = "${newEmail}", n.city = "${city}", n.country = "${country}" RETURN n.email AS r`
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
}
