const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')

// CREATE A NEW USER

usersRouter.post('/', async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({
      error: 'Both password and username must be provided',
    })
  }
  const { username, password } = req.body

  if (username.length < 8 || password.length < 8) {
    res.status(400).json({
      error: 'Both password and username should be at least 8 characters long',
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const userToSave = new User({
    username,
    passwordHash,
    activities: [],
  })

  const savedUser = await userToSave.save()
  console.log(savedUser.toJSON())
  res.status(200).json(savedUser)
})

module.exports = usersRouter
