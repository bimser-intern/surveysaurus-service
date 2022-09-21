const router = require('express').Router()
const { getMapValuesController } = require('../controller/mapController')
const yupValidate = require('../middleware/yup/yup')
const { getMapValuesSchema } = require('../schema/map')
router.get('/getmap', [yupValidate(getMapValuesSchema)], getMapValuesController)
module.exports = router
