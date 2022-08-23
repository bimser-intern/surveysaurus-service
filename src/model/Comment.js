const { executeCypherQuery } = require('../helper/db/dbHelper')

module.exports = {
    addComment: async ({ email, title, comment, parentID }) => {
        try {
            let writeQuery = ''

            if (parentID === undefined) {
                writeQuery = `MATCH (n:User) WHERE n.email = "${email}"
                MATCH (m:Survey) WHERE m.title = "${title}"
                MATCH (p:CommentCounter)
                CREATE (s:Comment{commentID:p.count+1, comment:"${comment}",time: datetime.realtime('+03:00'),upvote:0,report:0, surveytitle: "${title}" })
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
            const Query1 = `MATCH (n:User) WHERE n.email = "${email}"
            MATCH (m:Comment) WHERE m.commentID = ${commentID}
            MATCH (n)-[r:UPVOTED]->(m)
            RETURN COUNT(r) AS c`
            const Result1 = await executeCypherQuery(Query1)
            const res1 = Result1.records.map((_rec) => _rec.get('c'))
            if (res1 == 0) {
                const writeQuery = `MATCH (n:User) WHERE n.email = "${email}"
                                    MATCH (m:Comment) WHERE m.commentID = ${commentID}
                                    CREATE (n)-[r:UPVOTED]->(m)
                                    SET m.upvote = m.upvote+1 RETURN r`
                const writeResult = await executeCypherQuery(writeQuery)
                writeResult.records.map((_rec) => _rec.get('r'))
                return {
                    status: true,
                    data: { commentID },
                    message: 'Comment upvoted successfully',
                }
            } else {
                return {
                    status: false,
                    data: { commentID },
                    message: 'An user cannot upvote twice',
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

    report: async ({ email, commentID }) => {
        try {
            const Query1 = `MATCH (n:User) WHERE n.email = "${email}"
            MATCH (m:Comment) WHERE m.commentID = ${commentID}
            MATCH (n)-[r:REPORTED]->(m)
            RETURN COUNT(r) AS c`
            const Result1 = await executeCypherQuery(Query1)
            const res1 = Result1.records.map((_rec) => _rec.get('c'))
            if (res1 == 0) {
                const writeQuery = `MATCH (n:User) WHERE n.email = "${email}"
                                    MATCH (m:Comment) WHERE m.commentID = ${commentID}
                                    CREATE (n)-[r:REPORTED]->(m)
                                    SET m.report = m.report+1 RETURN r`
                const writeResult = await executeCypherQuery(writeQuery)
                writeResult.records.map((_rec) => _rec.get('r'))
                return {
                    status: true,
                    data: { commentID },
                    message: 'Comment reported successfully',
                }
            } else {
                return {
                    status: false,
                    data: { commentID },
                    message: 'An user cannot report twice',
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
    },
}
