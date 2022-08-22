const { executeCypherQuery } = require('../helper/db/dbHelper')

module.exports = {

    addComment : async ({
        email,
        title,
        comment,
        parentID,
    }) => {
        try {

            let writeQuery = ''

            if(parentID==null){

                writeQuery = `MATCH (n:User) WHERE n.email = "${email}"
                MATCH (m:Survey) WHERE m.title = "${title}"
                MATCH (p:CommentCounter)
                CREATE (s:Comment{commentID:p.count+1, comment:"${comment}",time: datetime.realtime('+03:00'),upvote:0,report:0, surveytitle: "${email}" })
                CREATE (n)-[:WRITED]->(s)
                CREATE (s)-[r:TO]->(m)
                return p.count as result
                `
            }

        else{
            writeQuery = `MATCH (n:User) WHERE n.email = "${email}"
            MATCH (k:Comment) WHERE k.commentID=${parentID}
            MATCH (p:CommentCounter)
            CREATE (s:Comment{commentID:p.count+1, comment:"${comment}",time: datetime.realtime('+03:00'),upvote:0,report:0, surveytitle: "${title}"})
            SET p.count = p.count+1
            CREATE (n)-[:WRITED]->(s)
            CREATE (s)-[r:TO]->(k)
            return p.count as result
            `
        }
             
            const writeResult = await executeCypherQuery(writeQuery)
            for (const record of writeResult.records) {
                const survey1Node = record.get('result')
               
            }
            return {
                status: true,
                data: {survey1Node},
                message: 'Added Comment Successfully',
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
    
}
