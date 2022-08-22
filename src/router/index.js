const router = require('express').Router()
const user = require('./user')
const survey =require('./survey')
const profile = require('./profile')

router.use('/user', user)
router.use('/survey', survey)
router.use('/profile', profile)

module.exports = router
