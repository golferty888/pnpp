const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors')
const { sendBroadcast, ackConnect, controlLight, disconnect } = require('./broadcast')
dotenv.config()

const dgram = require("dgram");
const socket = dgram.createSocket("udp4");
const app = express()

const port = process.env.PORT || 8080
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.get('/', function (req, res) {
  console.log(req)
  res.status(200).send({
    status: 200,
    message: 'API Work'
  })
})
app.listen(port)

socket.bind()
socket.on("listening", () => {
  socket.setBroadcast(true);
  const broadcast = setInterval(function () {
    sendBroadcast(socket, port)
  }, 1000)
});

app.post('/connect', async function (req, res) {
  const isSuccess = await ackConnect(req.body.ip)
  if (isSuccess.connect === true) {
    res.status(200).send({
      status: 200,
      message: isSuccess
    })
  } else {
    res.status(200).send({
      status: 500,
      message: 'This device already connect'
    })
  }
})


app.post('/', controlLight)

app.delete('/connect',disconnect)
