const express = require('express')
const router = express.Router()
const controller = require('./controller')

router.get('/findRas', controller.findRasberryPi)
router.post('/connect', controller.connectDevice)
router.post('/disconnect', controller.disConnectDevice)

module.exports = router
