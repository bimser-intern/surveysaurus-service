const CustomError = require('../helper/error/CustomError')
const asyncHandler = require('express-async-handler')
const { returnMapModel } = require('../model/map')
const { parseAsync } = require('json2csv')

const getMapValuesController = asyncHandler(async (req, res, next) => {
    const { title } = req.query
    try {
        const {
            status,
            data: { data },
            message,
        } = await returnMapModel({
            title,
        })
        console.log('title', title)
        console.log(data)
        if (!status) return next(new CustomError(message))
        const fields = ['countryname', 'countrycode', 'choicein', 'ch']
        const opts = { fields }
        const csv1 = await parseAsync(data, opts)
        const csv = csv1.replace(/["']/g, '').replace('\\r\\n', '')
        //res.attachment(title+"Map.csv")
        //res.set('Content-Type', 'application/octet-stream')
        //res.send(Buffer.from(csv));
        res.status(200).send(csv)
        // res.status(200).json({
        //     data: { csv },
        //     message: 'Map Values listed successfully',
        //  })
    } catch (error) {
        return next(new CustomError(error.message))
    }
})

module.exports = {
    getMapValuesController,
}
