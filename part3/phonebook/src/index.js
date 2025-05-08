import express from 'express'
import personsRouter from './controllers/persons.js'

const port = 3001
const app = express()

app.use('/api/persons', personsRouter)

app.listen(port, () => {
  console.log(`[server] Listening at http://localhost:${port}`)
})