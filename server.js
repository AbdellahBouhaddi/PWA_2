const express = require('express')
const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.routes')
const bodyParser = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser')
require('dotenv').config({ path: './config/.env' })
require('./config/db')
const { checkUser, requireAuth } = require('./middleware/auth.middleware')

const cors = require('cors')
const app = express()
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ['sessionId', 'Content-Type'],
  exposedHeaders: ['sessionId'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
}
app.use(cors(corsOptions))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser())

//jwt verification
app.get('*', checkUser)
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
})

// les routes
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)

// serveur production assests
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static(path.join('client/build')))

  app.get('*', checkUser, (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

//le serveur
app.listen(process.env.PORT, () => {
  console.log(`listning on port ${process.env.PORT}`)
})
