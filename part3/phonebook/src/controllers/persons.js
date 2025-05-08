import express from 'express'

export const persons = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "730-880-2302"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "335-546-6753"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "849-839-7702"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "843-288-9051"
  }
]

const router = express.Router()

router.get("/", (req, res) => {
  res.json(persons)
})

export default router