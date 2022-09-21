const CustomError = require('../helper/error/CustomError')
const asyncHandler = require('express-async-handler')
const { returnMapModel } = require('../model/Map')
const { parseAsync } = require('json2csv')

const getMapValuesController = asyncHandler(async (req, res, next) => {
    const { title } = req.body
    try {
        const {
            status,
            data: { data },
            message,
        } = await returnMapModel({
            title,
        })

        if (!status) return next(new CustomError(message))

        // generate
        /*
        const array = [Object.keys(data[0])].concat(data)
        const resultMap = array
            .map((it) => {
                return Object.values(it).toString()
            })
            .join('\n')
            */
        const fields = ['countryname', 'countrycode', 'bestindex', 'bestchoice']
        const opts = { fields }
        const csv1 = await parseAsync(data, opts)
        const csv = csv1.replace(/["']/g, '').replace('\\r\\n', '')
/*
        res.status(200).json({
            data: { csv },
            message: 'Map Values listed successfully',
        })
        */
       res.status(200).attachment(csv)
    } catch (error) {
        return next(new CustomError(error.message))
    }
})

module.exports = {
    getMapValuesController,
}
