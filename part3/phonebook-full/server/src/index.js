import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import personsRouter, { persons } from './controllers/persons.js'

const port = 3001
const app = express()
const postFormat = ':method :url :status :res[content-length] - :response-time ms :body'

app.use(cors())

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})

app.use((req, res, next) => {
  if (req.method === 'POST') {
    morgan(postFormat)(req, res, next)
  } else {
    morgan('tiny')(req, res, next)
  }
})

app.use(express.json())

app.use('/api/persons', personsRouter)

app.get('/info', (req, res) => {
  const current = new Date()

  res.send(`
<p>Phonebook has info for ${persons.length} people</p>
<p>${current.toUTCString()}-0500 (Eastern Standard Time)</p>
  `)
})

app.listen(port, () => {
  console.log(`[server] Listening at http://localhost:${port}`)
})