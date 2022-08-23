const router = require('express').Router()
const user = require('./user')
const survey = require('./survey')
const profile = require('./profile')
const comment = require('./comment')

router.use('/user', user)
router.use('/survey', survey)
router.use('/profile', profile)
router.use('/comment', comment)

module.exports = router
