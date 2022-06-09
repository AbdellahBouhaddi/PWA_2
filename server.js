const express = require('express')
const userRoutes = require('./routes/user.routes')
const bodyParser = require('body-parser')
require('dotenv').config({ path: './config/.env' })
require('./config/db')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// les reoutes
app.use('/api/user', userRoutes)

//le serveur
app.listen(process.env.PORT, () => {
  console.log(`listning on port ${process.env.PORT}`)
})
