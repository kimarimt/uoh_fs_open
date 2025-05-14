const unknownEndpointHandler = (req, res) => {
  res.status(404).send({ error: 'unknown enpoint' })
}

const errorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).send({ error: err.message })
  }

  next(err)
}

export default {
  unknownEndpointHandler,
  errorHandler,
}
