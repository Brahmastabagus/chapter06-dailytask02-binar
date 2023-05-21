const express = require('express')
const routes = require('./routes')
const path = require('path')
const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'controller')))

app.use(routes)

app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`)
})
