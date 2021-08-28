require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

module.exports = {
  MONGODB_URI,
  mongooseOptions,
  PORT,
}
