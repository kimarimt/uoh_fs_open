const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown enpoint' })
}

const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Malformed id' })
  }
  else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }

  next(err)
}

export default {
  unknownEndpoint,
  errorHandler,
}
