const neo4j = require('neo4j-driver')
const { NEO4J_HOST, NEO4J_USERNAME, NEO4J_USER_PASS } = require('../../config')

const connectDB = () => {
    const uri = NEO4J_HOST
    const user = NEO4J_USERNAME
    const password = NEO4J_USER_PASS

    const driver = neo4j.driver(uri, neo4j.auth.basic(user, password), {
        maxConnectionLifetime: 3 * 60 * 60 * 1000, // 3 hours
        maxConnectionPoolSize: 50,
        connectionAcquisitionTimeout: 2 * 60 * 1000, // 120 seconds
        disableLosslessIntegers: true,
    })
    global.session = driver.session({ database: 'neo4j' })
}
async function executeCypherQuery(statement, params = {}) {
    try {
        const result = global.session.run(statement, params)
        // session.close()
        return result
    } catch (error) {
        throw error // we are logging this error at the time of calling this method
    }
}
module.exports = { executeCypherQuery, connectDB }
