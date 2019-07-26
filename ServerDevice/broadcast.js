const ip = require('ip')
const myIp = ip.address()
const dotenv = require('dotenv').config()
const Gpio = require('onoff').Gpio

const led = new Gpio(process.env.gpio_no, 'out')
const json = {
  'name': 'devicepi',
  'device': 'light',
  'action': 'off,',
  'url': `http://${myIp}:8080/connect`,
  'isConnect': false,
  'moduleIp': ''
}
module.exports = {
  sendBroadcast: (socket, port) => {
    // 255.255.255.255 - boradcast for local network - RFC922
    socket.send(JSON.stringify(json), port, "255.255.255.255", err => {
      console.log(err ? err : "Sended");
      // socket.close();
    });
  },
  ackConnect: async (ip) => {
    console.log(json)
    if (json.isConnect === false) {
      json.isConnect = true
      json.moduleIp = ip
      console.log(json)
      return { 'connect': true, 'url': `http://${myIp}:8080?action=`, 'disconnect_url': `http://${myIp}:8080/connect`, 'action': json.action}
    } else {
      return { 'connect': false }
    }
  },
  controlLight: async (req, res) => {
    console.log(req.body)
    console.log(req.query)    
    const { action } = req.query
    const { source } = req.body
    try {
      if(source === json.moduleIp){
        if (action.toLowerCase() === 'on') {
          await led.writeSync(1)
        } else if (action.toLowerCase() === 'off') {
          await led.writeSync(0)
        }
        res.status(200).send({
          status: 200,
          message: `Light is turn ${action}`
        })
      } else {
        res.status(200).send({
          status: 500,
          message: 'Not have permission'
        })
      }
    }
    catch (err) {
      res.status(200).send({
        status: 500,
        message: err.message
      })
    }
  },
  disconnect: async (req,res) => {
    console.log(req)
    const { source } = req.body
    console.log(source)
    console.log(json.moduleIp)
    try {
      if(source === json.moduleIp){
       json.moduleIp = ''
       json.isConnect = false
       console.log(json)
        res.status(200).send({
          status: 200,
          message: `Disconnected`
        })
      } else {
        res.status(200).send({
          status: 500,
          message: 'Not have permission'
        })
      }
    }
    catch (err) {
      res.status(200).send({
        status: 500,
        message: err.message
      })
    }
  }
}