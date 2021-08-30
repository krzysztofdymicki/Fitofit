const config = require('../utils/config')
const date = require('../utils/dateFunctions')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const signInRouter = require('express').Router()
const User = require('../models/User')

// --- SIGN IN -----------

signInRouter.post('/', async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({
      error: 'Both password and username must be provided',
    })
  }
  const { username, password } = req.body

  const userInDb = await User.findOne({ username })

  if (!userInDb || !bcrypt.compare(password, userInDb.passwordHash)) {
    return res.status(401).json({
      error: 'username or password wrong',
    })
  }

  const userForToken = {
    username: userInDb.username,
    id: userInDb._id,
  }

  const token = jwt.sign(userForToken, config.JWT_SECRET)

  res.status(200).json({
    token,
    username: userForToken.username,
  })
})

module.exports = signInRouter
