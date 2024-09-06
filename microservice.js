const express = require('express')
const app = express()
const port = 3000

app.get('/data', (req, res) => {
   const student = { name: 'John', age: 25, subject: 'History' }
  res.json(student)
})
//JSON.parse(body)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})