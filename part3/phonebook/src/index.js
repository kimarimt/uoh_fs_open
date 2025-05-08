import express from 'express'
import personsRouter, { persons } from './controllers/persons.js'

const port = 3001
const app = express()

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