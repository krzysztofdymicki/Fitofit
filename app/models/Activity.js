const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema(
  {
    start: String,
    end: String,
    date: Date,
    distance: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
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

module.exports = mongoose.model('Activity', activitySchema)
