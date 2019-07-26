const dgram = require('dgram')
const axios = require('axios')
const ip = require('ip')
module.exports = {
  findRasberryPi: async (req, res) => {
    console.log('finding')
    let devices = []
    const socket = dgram.createSocket('udp4');
    try {
      socket.bind(8080)
      socket.on('message', async function (msg, rinfo) {
        tmp = JSON.parse(msg.toString())
        const data = {
          'name': tmp.name,
          'device': tmp.device,
          'url': tmp.url,
          'from': rinfo
        }
        console.log('data', data)
        console.log(devices.length)
        let exist = false
        if (devices.length !== 0) {
          await devices.forEach((device) => {
            if (device.from.address === data.from.address) {
              console.log('device.from.address ', device.from.address)
              console.log('data.from.address ', data.from.address)
              exist = true
            }else{
              exist = false
            }
          })
        }
        if (exist === false) {
          devices.push(data)
        }
      })
      setTimeout(function () {
        socket.close()
        console.log('send to frontend')
        res.status(200).send({devices})
      }, 3000)
    } catch (err) {
      res.status(500).send({
        status: 500,
        message: err.message
      })
    }
  },
  connectDevice: async (req,res) => {
    const {url} = req.body
    const result = await axios.post(url, {
        'ip': ip.address()
    })
    const msg = result.data.message

    if(result.data.status === 200){
      console.log(200)  
      return res.status(200).send({msg})
    }else if(result.data.status === 500){
      console.log(500)
      res.status(500).send({msg})
    }
  },

  disConnectDevice: async (req,res) => {
    const {url} = req.body
    const result = await axios.delete(url,
      { data: {
        'source': ip.address()
        }
      }
    )
    const msg = result.data.message
    if(result.data.status === 200){
      console.log(200)  
      return res.status(200).send({msg})
    }else if(result.data.status === 500){
      console.log(500)
      res.status(500).send({msg})
    }
  }
}

