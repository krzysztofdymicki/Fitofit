const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')
const { response } = require('express')

// CREATE A NEW USER

usersRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  if (username.length < 8 || password.length < 8) {
    res.status(400).json({
      error: 'Both password and username should be at least 8 characters long',
    })
  }

  const saltRounds = 10
  const passwordHash = bcrypt.hash(password, saltRounds)

  const userToSave = new User({
    username,
    passwordHash,
    activities: [],
  })

  try {
    const savedUser = await userToSave.save()
    response.status(200).json(savedUser)
  } catch (err) {
    console.log(err)
  }
})

module.exports = usersRouter
