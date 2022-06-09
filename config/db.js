const mongosse = require('mongoose')

mongosse
  .connect(
    'mongodb+srv://' +
      process.env.DB_USER_PASS +
      '@likididb.lu9fpuu.mongodb.net/Likidi'
  )
  .then(() => console.log('connected to mongoDb'))
  .catch((err) => console.log('failed to connect to MongoDB', err))
