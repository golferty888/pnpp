const express = require('express')
const router = express.Router()
const senderRoute = require('./sender/routes')
const findDeviceRoute = require('./find_device/routes')

router.use('/send', senderRoute)
router.use('/find', findDeviceRoute)
module.exports = router