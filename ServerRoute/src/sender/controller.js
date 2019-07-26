const axios = require('axios')
const ip = require('ip')
module.exports = {
  sendMessage: async (req, res) => {
    const { url, action } = req.body
    const result = await axios.post(`${url}${action}`, {
      'source': ip.address()
    })
    const msg = result.data.message

    if (result.data.status === 200) {
      console.log(200)
      return res.status(200).send({ msg })
    } else if (result.data.status === 500) {
      console.log(500)
      res.status(500).send({ msg })
    }
  },
  sendMessageByGoogle: async (req, res) => {
    console.log(req.body.queryResult.parameters)
    const { action, device } = req.body.queryResult.parameters
    console.log('action', action)
    console.log('device', device)
    if (device == 'light') {
      // const url = `http://172.20.10.10:8080?action=`
      const result = await axios.post(`${url}${action}`, {
        'source': ip.address()
      })

      const msg = result.data.message
      responseObj = {
        fulfillmentMessages: [{
          "payload": {
            "google": {
              "expectUserResponse": true,
              "richResponse": {
                "items": [
                  {
                    "simpleResponse": {
                      "textToSpeech": msg
                    }
                  }
                ]
              }
            }
          }
        }]
      };
      if (result.data.status === 200) {
        console.log(200)
        return res.json(responseObj)
      } else if (result.data.status === 500) {
        console.log(500)
        res.json(msg)
      }
    } else {
      msg = {
        fulfillmentMessages: [{
          "payload": {
            "google": {
              "expectUserResponse": true,
              "richResponse": {
                "items": [
                  {
                    "simpleResponse": {
                      "textToSpeech": `Do not have ${device}`
                    }
                  }
                ]
              }
            }
          }
        }]
      };
      res.json(msg)
    }
  }
}