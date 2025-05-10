import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import personsRouter from './controllers/person.js'
import Person from './models/person.js'

dotenv.config()

const port = process.env.PORT || 3001
const app = express()
const postFormat = ':method :url :status :res[content-length] - :response-time ms :body'

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

mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGODB_URI)

app.use(express.static('dist'))
app.use(express.json())

app.use('/api/persons', personsRouter)

app.get('/info', async (req, res) => {
  const current = new Date()
  const totalPersons = await Person.countDocuments();

  res.send(`
<p>Phonebook has info for ${totalPersons} people</p>
<p>${current.toUTCString()}-0500 (Eastern Standard Time)</p>
  `)
})

app.listen(port, () => {
  console.log(`[server] Listening at http://localhost:${port}`)
})