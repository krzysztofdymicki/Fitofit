const { MONGODB_URI, PORT, mongooseOptions } = require('./utils/config')
const express = require('express')
const mongoose = require('mongoose')

// CONNECTING TO THE DB

mongoose
  .connect(MONGODB_URI, mongooseOptions)
  .then(() => console.log('Connected to the DB'))
  .catch((err) => console.log(err.message))

const app = express()

app.listen(PORT, () => console.log(`Fitofit app listening at port ${PORT}`))
