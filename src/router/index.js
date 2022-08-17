const router = require('express').Router()
const user = require('./user')
const survey =require('./survey')

router.use('/user', user)
router.use('/survey', survey)

module.exports = router
