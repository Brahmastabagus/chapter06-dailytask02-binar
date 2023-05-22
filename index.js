const express = require('express')
const routes = require('./routes')
const bodyParser = require('body-parser');
const path = require('path')
const app = express()
const cors = require('cors')
const PORT = 8080

app.use(
  cors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'controller')))

app.use(routes)

app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`)
})
