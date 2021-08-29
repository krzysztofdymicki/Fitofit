require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT
const JWT_SECRET = process.env.JWT_SECRET
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

module.exports = {
  MONGODB_URI,
  mongooseOptions,
  PORT,
  JWT_SECRET,
}
