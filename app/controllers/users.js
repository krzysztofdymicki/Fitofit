const config = require('../utils/config')
const date = require('../utils/dateFunctions')
const bcrypt = require('bcrypt')
const axios = require('axios')
const geolib = require('geolib')
const jwt = require('jsonwebtoken')
const usersRouter = require('express').Router()
const User = require('../models/User')
const Activity = require('../models/Activity')

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

// ADD NEW ACTIVITY

const locationIQURL = (adr) => {
  const url = `https://eu1.locationiq.com/v1/search.php?key=${
    config.LOCATIONIQ_KEY
  }&q=${encodeURI(adr)}&format=json`
  return url
}

const getCoordinates = async (url) => {
  const response = await axios.get(url)
  return response.data
}

usersRouter.post('/activities', async (req, res) => {
  const decodedToken = jwt.verify(req.token, config.JWT_SECRET)

  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token invalid or missing' })
  }
  const { start, end, date } = req.body
  try {
    const user = await User.findById(decodedToken.id)
    const startCoordinates = await getCoordinates(locationIQURL(start))
    const endCoordinates = await getCoordinates(locationIQURL(end))
    const distance =
      geolib.getDistance(
        {
          latitude: startCoordinates[0].lat,
          longitude: startCoordinates[0].lon,
        },
        { latitude: endCoordinates[0].lat, longitude: endCoordinates[0].lon }
      ) / 1000
    console.log('distance', distance)

    const newActivity = new Activity({
      start,
      end,
      date: new Date(date),
      distance,
      user: user._id,
    })

    const savedNewActivity = await newActivity.save()

    user.activities = user.activities.concat(savedNewActivity._id)

    await user.save()
    res.status(200).json(savedNewActivity)
  } catch (e) {
    res.status(400).json({
      error: 'Did not find the adress',
    })
  }
})

// -- GET ACTIVITIES OF THE USER

usersRouter.get('/activities/:period', async (req, res) => {
  console.log(req.token)
  const decodedToken = jwt.verify(req.token, config.JWT_SECRET)

  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token invalid or missing' })
  }
  const user = await User.findById(decodedToken.id)
  if (!user)
    return res.status(400).json({
      error: 'No such an user in the database',
    })

  // -- SELECT ONLY ONE WEEK OF ACTIVITIES

  let activities = []
  if (req.params.period === 'week') {
    activities = await Activity.find({
      user: user._id,
      date: {
        $gte: date.startOfWeek(),
        $lt: date.endOfWeek(),
      },
    })
  } // -- SELECT ONLY ONE MONTH OF ACTIVITIES
  else if (req.params.period === 'month') {
    console.log('month')
  }

  res.status(200).json(activities)
})

module.exports = usersRouter
