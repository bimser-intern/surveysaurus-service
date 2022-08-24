const { executeCypherQuery } = require('../helper/db/dbHelper')

module.exports = {
    addComment: async ({ email, title, comment, parentID }) => {
        try {
            let writeQuery
            if (parentID == undefined) {
                writeQuery = `MATCH(u:User) WHERE u.email = "${email}"
            MATCH (s:Survey) WHERE s.title = "${title}"
            MATCH (p:CommentCounter)
            CREATE (c:Comment{commentID:p.count+1, comment:"${comment}",time: datetime.realtime('+03:00'),upvote:0,report:0, path : [p.count+1]}) 
            SET p.count = p.count+1
            CREATE (c)-[r:TO]->(s)
            CREATE (u)-[t:WRITED]->(c)
            RETURN c.commentID as result`
            } else {
                writeQuery = `MATCH(u:User) WHERE u.email = "${email}"
                MATCH (s:Survey) WHERE s.title = "${title}"
                MATCH (c1: Comment) WHERE c1.commentID = ${parentID}
                MATCH (p:CommentCounter)
                CREATE (c:Comment{commentID:p.count+1, comment:"${comment}",time: datetime.realtime('+03:00'),upvote:0,report:0, 
                path : c1.path + (p.count+1)}) 
                SET p.count = p.count+1
                CREATE (c)-[r:TO]->(c1)
                CREATE (u)-[t:WRITED]->(c)
                RETURN c.commentID as result`
            }

            const writeResult = await executeCypherQuery(writeQuery)

            const [commentID] = writeResult.records.map((_rec) => _rec.get('result'))

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
            let writeQuery = `MATCH (s:Survey) WHERE s.title = "${title}"
            MATCH (c:Comment)-[:TO]-(s)
            MATCH (u:User)-[:WRITED]->(c)
            RETURN u.name AS u, c ORDER BY c.commentID DESC`
            const writeResult = await executeCypherQuery(writeQuery)
            const names = writeResult.records.map((_rec) => _rec.get('u'))
            const comment = writeResult.records.map((_rec) => _rec.get('c').properties)
            const comments = comment.map((_comment,idx)=>({..._comment,author : names[idx]}))
            /*
            const names = writeResult.records.map((_rec) => _rec.get('u').properties)
            const comments = writeResult.records.map((_rec) => _rec.get('c').properties)
            const commentIDs = writeResult.records.map((_rec) => _rec.get('id').properties)
            const times = writeResult.records.map((_rec) => _rec.get('t').properties)
            const upvotes = writeResult.records.map((_rec) => _rec.get('up').properties)
            const reports = writeResult.records.map((_rec) => _rec.get('r').properties)
            */
            return {
                status: true,
                data: { comments },
                message: 'Comments returned successfully',
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
