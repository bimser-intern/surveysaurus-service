const router = require('express').Router()
const user = require('./user')
const survey = require('./survey')
const profile = require('./profile')
const comment = require('./comment')
const map = require('./map')

router.use('/user', user)
router.use('/survey', survey)
router.use('/profile', profile)
router.use('/comment', comment)
router.use('/map', map)

module.exports = router
