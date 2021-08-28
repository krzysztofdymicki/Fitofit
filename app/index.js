const { MONGODB_URI, PORT, mongooseOptions } = require('./utils/config')
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const usersRouter = require('./controllers/users')
// CONNECTING TO THE DB

mongoose
  .connect(MONGODB_URI, mongooseOptions)
  .then(() => console.log('Connected to the DB'))
  .catch((err) => console.log(err.message))

// EXPRESS APP INITIALIZING + MIDDLEWARE

const app = express()
app.use(express.json())
app.use(morgan('tiny'))
app.use('/api/users', usersRouter)

app.listen(PORT, () => console.log(`Fitofit app listening at port ${PORT}`))
