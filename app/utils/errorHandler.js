const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: 'unknown endpoint ' })
}

const errors = (error, req, res, next) => {

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'invalid token',
    })
  }

  next(error)
}

module.exports = {
  unknownEndpoint,
  errors,
}
