require('dotenv').config()
const express = require('express')
const app = express()
const axios = require('axios')
const { MICROSERVICE_URL} = process.env

app.get('/', (req, res) => {
  axios.get(MICROSERVICE_URL + "/data")
    .then(response => {
      res.send(`Hello World and Hey ${response.data.name}`)
    })
    .catch(error => {
      console.log(error)
      res.send('Error')
    })
})

app.listen(4000, () => {
  console.log('Server listening on port 4000')
})
