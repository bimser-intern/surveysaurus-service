const { executeCypherQuery } = require('../helper/db/dbHelper')

module.exports = {
    addComment: async ({ email, title, comment, parentID }) => {
        try {
            let writeQuery = ''

            if (parentID === undefined) {
                writeQuery = `MATCH (n:User) WHERE n.email = "${email}"
                MATCH (m:Survey) WHERE m.title = "${title}"
                MATCH (p:CommentCounter)
                CREATE (s:Comment{commentID:p.count+1, comment:"${comment}",time: datetime.realtime('+03:00'),upvote:0,report:0, surveytitle: "${tittle}" })
                CREATE (n)-[:WRITED]->(s)
                CREATE (s)-[r:TO]->(m)
                return p.count as result
                `
            } else {
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

            const [commentID] = writeResult.records.map((_rec) =>
                _rec.get('result')
            )

            return {
                status: true,
                data: { commentID },
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
    },

    upVote: async ({ email, commentID }) => {
        try {

            const writeQuery = `MATCH (n:User) WHERE n.email = "${email}"
            MATCH (m:Comment) WHERE m.commentID = ${commentID}
            WITH m.upvote AS u
            MERGE (n)-[r:UPVOTED]->(m)
            ON CREATE SET m.upvote = m.upvote+1
           RETURN m.upvote-u AS res`
            const writeResult = await executeCypherQuery(writeQuery)
            const [commentId] = writeResult.records.map((_rec) => _rec.get('res'))
            if (res == 0) {
                return {
                    status: false,
                    data: { commentId },
                    message: 'An user cannot upvote twice',
                }
            }
            else {
                return {
                    status: true,
                    data: { commentId },
                    message: 'Upvoted successfully',
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

    report: async ({ email, commentID }) => {
        try {
            let writeQuery = `MATCH (n:User) WHERE n.email = "${email}"
            MATCH (m:Comment) WHERE m.commentID = ${commentID}
            WITH m.report AS u
            MERGE (n)-[r:REPORTED]->(m)
            ON CREATE SET m.report = m.report+1
            RETURN m.report-u AS a, m.report AS result`
            const writeResult = await executeCypherQuery(writeQuery)
            let res1 = writeResult.records.map((_rec) => _rec.get('a'))
            let result = writeResult.records.map((_rec) => _rec.get('result'))
            if (res1 == 0) {
                return {
                    status: false,
                    data: { result },
                    message: 'An user cannot report twice',
                }
            }
            else {
                if (result >= 10) {
                    const Query = `MATCH (s:Comment) WHERE s.commentID = ${commentID} 
                MATCH (m:Comment)-[:TO]-(s)
                DETACH DELETE (m);
                MATCH (n:Comment) WHERE n.commentID = ${commentID} 
                DETACH DELETE (n)
                RETURN -1 as res`
                    const result = await executeCypherQuery(Query)
                    let res = result.records.map((_rec) => _rec.get('res'))
                    return {
                        status: true,
                        data: { res },
                        message: 'Comment deleted successfully',
                    }
                }
                else {
                    return {
                        status: true,
                        data: { result },
                        message: 'Reported Successfully',
                    }
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

    getCommentsModel: async ({ title }) => {
        try {
            let writeQuery = ''

            writeQuery = `MATCH (s:Survey)-[:WRITED]->(c:Comment) WHERE s.title = "${title}" RETURN c`

            const writeResult = await executeCypherQuery(writeQuery)

            const comments = writeResult.records.map((_rec) => _rec.get('c'))

            console.log(comments)
            return {
                status: true,
                data: { comments },
                message: 'Report Successfully',
            }
        } catch (error) {
            return {
                status: false,
                data: {},
                message: `Something went wrong: ${error.message}`,
            }
        }
    },

    getCommentModelV2: async ({ email, title }) => {
        try {
            writeQuery = `MATCH (s:Survey) WHERE s.title = "${title}"
                          MATCH (u:User) WHERE u.email = "${email}"

                        
            
            
            
            
            `

            /*
                        MATCH (s:Survey) WHERE s.title = "bestie"
                        MATCH (u:User) WHERE u.email = "test1@gmail.com"
                        MATCH (c1:Comment) WHERE c1.surveytitle = "bestie" 
                        RETURN c1
            
            */



            const writeResult = await executeCypherQuery(writeQuery)

            const comments = writeResult.records.map((_rec) => _rec.get('c'))

            console.log(comments)
            return {
                status: true,
                data: { comments },
                message: 'Report Successfully',
            }
        } catch (error) {
            return {
                status: false,
                data: {},
                message: `Something went wrong: ${error.message}`,
            }
        }
    }
}
