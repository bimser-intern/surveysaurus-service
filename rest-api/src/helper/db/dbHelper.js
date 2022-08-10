module.exports = {
    
    
    closeDB: (async(driver, session) => {
        await session.close(),
        await driver.close()
    }),
}

    const neo4j = require('neo4j-driver')
    const uri = process.env.NEO4J_HOST;
    const user = process.env.NEO4J_USERNAME;
    const password = process.env.NEO4J_USER_PASS;
    const driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
    export const session = driver.session({ database: 'neo4j' })


/*

     // Don't forget to close the driver connection when you're finished with it
   await session.close()
    await driver.close()
*/