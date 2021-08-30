const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const activitySchema = new mongoose.Schema({
  start: String,
  end: String,
  date: Date,
  distance: Number,
})

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      minlength: 8,
    },
    passwordHash: String,
    activities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity',
      },
    ],
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
        delete ret.passwordHash
      },
    },
  }
)

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
