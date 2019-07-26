const ngrok = require('ngrok')
const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
var cors = require('cors')
dotenv.config()

const app = express()
const apiRoute = require('./src/routes')
const port = process.env.PORT || 8080


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/', function (req, res) {
  res.status(200).send({
    status: 200,
    message: 'API Work'
  })
})

app.use('/', apiRoute)
app.listen(port)

ngrok.connect({
    proto : 'http',
    addr : process.env.PORT,
    authtoken: process.env.token
})
.then((url) => {
    console.log('Tunnel Created -> ', url)
})
.catch((err) => {
    console.error('Error while connecting Ngrok',err)
    return new Error('Ngrok Failed')
})
