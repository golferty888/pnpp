const express = require('express')
const router = express.Router()
const controller = require('./controller')

router.post('/sendMessage', controller.sendMessage)
router.post('/sendMessageByGoogle', controller.sendMessageByGoogle)

module.exports = router
