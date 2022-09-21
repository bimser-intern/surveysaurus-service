const { executeCypherQuery } = require('../helper/db/dbHelper')
const returnMapModel = async ({ title }) => {
    try {
        const getCountriesQuery = `MATCH (u:User)-[r:VOTED]->(s:Survey) WHERE s.title = "${title}"
        MATCH (u)-[r1:LIVES]->(c:Country)
        RETURN collect(DISTINCT c.code) AS a`
        const getCountriesResult = await executeCypherQuery(getCountriesQuery)
        const countries = getCountriesResult.records.map((_rec) => _rec.get('a'))[0]

        let countrynames = []
        let countrycodes = []
        let choiceindex = []
        let choices = []

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
            //responseArr.push(nameofcountry + ',' + countries[i] + ',' + maxitem + ',' + choice)
            countrynames.push(nameofcountry)
            countrycodes.push(countries[i])
            choiceindex.push(maxitem)
            choices.push(choice)
        }
        let countrylist = countries[0] ? "\""+countries[0] +"\"" : undefined;
        if(countrylist != undefined){
            for(let i = 1; i<countrycodes.length; i++){
                countrylist += "AND c.code <> \""+countrycodes[i]+"\"";
            }
            countrylist = "WHERE c.code <> "+countrylist
        }
        const otherCountriesQuery = `MATCH (c:Country) ${countrylist ? countrylist : ""} RETURN c.name AS cn, c.code AS cod`
        const otherCountriesRes = await executeCypherQuery(otherCountriesQuery);
        const getcountryNames = otherCountriesRes.records.map((_rec) => _rec.get('cn'));
        const getcountryCodes = otherCountriesRes.records.map((_rec) => _rec.get('cod'));
        const data = countrynames.map((countryname, index) => ({
            countryname,
            countrycode: countrycodes[index],
            bestindex: choiceindex[index],
            bestchoice: choices[index],
        }))
        const data4NotListed = getcountryNames.map((countryname, index) => ({
            countryname,
            countrycode: getcountryCodes[index],
            bestindex: "",
            bestchoice: "",
        }))
        for(let i = 0; i<data4NotListed.length; i++){
            data.push(data4NotListed[i])
        }
        console.log("Yazdi: \n\r",data);
        return {
            status: true,
            data: { data },
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
