const { MONGODB_URI, PORT, mongooseOptions } = require('./utils/config')
const express = require('express')
require('express-async-errors')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const usersRouter = require('./controllers/users')
const signInRouter = require('./controllers/singIn')
const { unknownEndpoint, errors } = require('./utils/errorHandler')
const { tokenExtractor } = require('./utils/middleware')

// CONNECTING TO THE DB

mongoose
  .connect(MONGODB_URI, mongooseOptions)
  .then(() => console.log('Connected to the DB'))
  .catch((err) => console.log(err.message))

// EXPRESS APP INITIALIZING + MIDDLEWARE

const app = express()
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(tokenExtractor)
app.use(morgan('tiny'))
app.use('/api/users', usersRouter)
app.use('/api/signin', signInRouter)

// ERROR HANDLING

app.use(errors)
app.use(unknownEndpoint)

app.listen(PORT || 3001, () => console.log(`Fitofit app listening at port ${PORT || 3001}`))
