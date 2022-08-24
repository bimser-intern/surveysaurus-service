const { executeCypherQuery } = require('../helper/db/dbHelper')
const returnMapModel = async ({ title }) => {
    try {
        const getCountriesQuery = `MATCH (u:User)-[r:VOTED]->(s:Survey) WHERE s.title = "${title}"
        MATCH (u)-[r1:LIVES]->(c:Country)
        RETURN collect(DISTINCT c.code) AS a`
        const getCountriesResult = await executeCypherQuery(getCountriesQuery)
        const countries = getCountriesResult.records.map((_rec) => _rec.get('a'))[0]
        console.log(countries)
        const values = ''
        let responseArr = []
        for (i = 0; i < countries.length; i++) {
            const getValuesQuery = `MATCH (u:User)-[r1:LIVES]->(c:Country) WHERE c.code = "${countries[i]}"
            MATCH (u)-[r:VOTED]->(s:Survey) WHERE s.title = "${title}"
            WITH r, c.name AS cname
            RETURN cname, apoc.coll.frequencies(collect(r.choice)) AS a`
            const getValueResult = await executeCypherQuery(getValuesQuery)
            const getValues = getValueResult.records.map((_rec) => _rec.get('a'))[0]
            const nameofcountry = getValueResult.records.map((_rec) => _rec.get('cname'))[0]
            let valitem = []
            let valcount = []
            for (j = 0; j < getValues.length; j++) {
                valcount.push(getValues[j].count)
                valitem.push(getValues[j].item)
            }
            const maxitem = valitem[valcount.indexOf(Math.max(...valcount))]
            const getChoiceQuery = `MATCH (s:Survey) WHERE s.title = "${title}" RETURN s.choices[${maxitem}] AS b`
            const readChoice = await executeCypherQuery(getChoiceQuery)
            const choice = readChoice.records.map((_rec) => _rec.get('b'))[0]
            responseArr.push(nameofcountry + ',' + countries[i] + ',' + maxitem + ',' + choice)
        }
        return {
            status: true,
            data: { mapValue: responseArr },
            message: `Başarılı`,
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
    returnMapModel,
}
