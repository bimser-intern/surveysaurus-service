const neo4j = require('neo4j-driver');
const uri = process.env.NEO4J_HOST;
const user = process.env.NEO4J_USERNAME;
const password = process.env.NEO4J_USER_PASS;
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password), {
  maxConnectionLifetime: 3 * 60 * 60 * 1000, // 3 hours
  maxConnectionPoolSize: 50,
  connectionAcquisitionTimeout: 2 * 60 * 1000, // 120 seconds
  disableLosslessIntegers: true
});
const session = driver.session({ database: 'neo4j' });
async function executeCypherQuery(statement, params = {}) {
  try {
    const result = session.run(statement, params);
    session.close();
    return result;
  } catch (error) {
    throw error; // we are logging this error at the time of calling this method
  }
}
module.exports = { executeCypherQuery };