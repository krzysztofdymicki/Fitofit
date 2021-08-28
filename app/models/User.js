const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const activitySchema = new mongoose.Schema({
  type: String,
  start: String,
  end: String,
  date: Date,
  distance: Number,
})

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 8,
  },
  passwordHash: String,
  activities: [activitySchema],
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.__id
    delete returnedObject.__V
    delete returnedObject.passwordHash
  },
})

module.exports = mongoose.model('User', userSchema)
