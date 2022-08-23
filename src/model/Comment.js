const { executeCypherQuery } = require('../helper/db/dbHelper')

module.exports = {
    addComment: async ({ email, title, comment, parentID }) => {
        try {
            let writeQuery = ''

            if (parentID === undefined) {
                writeQuery = `MATCH (n:User) WHERE n.email = "${email}"
                MATCH (m:Survey) WHERE m.title = "${title}"
                MATCH (p:CommentCounter)
                CREATE (s:Comment{commentID:p.count+1, comment:"${comment}",time: datetime.realtime('+03:00'),upvote:0,report:0, surveytitle: "${email}" })
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
            let writeQuery = ''

            writeQuery = `MATCH (n:User) WHERE n.email = "${email}"
                MATCH (m:Comment) WHERE m.commentID = ${commentID}
                SET m.upvote = m.upvote+1
                CREATE (n)-[r:UPVOTED]->(m)
                RETURN r`

            const writeResult = await executeCypherQuery(writeQuery)

            const [commentId] = writeResult.records.map((_rec) => _rec.get('r'))

            return {
                status: true,
                data: { commentId },
                message: 'upVote Successfully',
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
        // var | let |
        try {
            let writeQuery = ''

            writeQuery = `MATCH (n:User) WHERE n.email = "${email}"
                MATCH (m:Comment) WHERE m.commentID = ${commentID}
                SET m.report = m.report+1
                CREATE (n)-[r:REPORTED]->(m)
                RETURN m.report AS result`

            const writeResult = await executeCypherQuery(writeQuery)

            let result = writeResult.records.map((_rec) => _rec.get('result'))

            return {
                status: true,
                data: { result },
                message: 'Report Successfully',
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
            ////////////////////////////////////////////
            return {
                status: false,
                data: {},
                message: `Something went wrong: ${error.message}`,
            }
        }
    },
}
