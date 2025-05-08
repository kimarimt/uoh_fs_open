import express from 'express'

export let persons = [
  {
    'id': '1',
    'name': 'Arto Hellas',
    'number': '730-880-2302'
  },
  {
    'id': '2',
    'name': 'Ada Lovelace',
    'number': '335-546-6753'
  },
  {
    'id': '3',
    'name': 'Dan Abramov',
    'number': '849-839-7702'
  },
  {
    'id': '4',
    'name': 'Mary Poppendieck',
    'number': '843-288-9051'
  }
]

const router = express.Router()

router.post('/', (req, res) => {
  if (!req.body.name || !req.body.number) {
    return res.status(400).json({ 
      'error': 'name and number fields are required' 
    })
  }

  const person = persons.find(p => p.name === req.body.name) 

  if (person) {
    return res.status(400).json({
      'error': `name must be unique`
    })
  }

  const newPerson = {
    id: `${Math.floor(Math.random() * 96) + persons.length}`,
    ...req.body
  }

  persons = [...persons, newPerson]
  res.json(newPerson)
})

router.get('/', (req, res) => {
  res.json(persons)
})

router.get('/:id', (req, res) => {
  const person = persons.find(p => p.id === req.params.id)

  if (!person) {
    return res.status(404).json({
      'error': 'person not found'
    })
  }

  res.json(person)
})

router.delete('/:id', (req, res) => {
  const person = persons.find(p => p.id === req.params.id)

  if (!person) {
    return res.status(404).json({
      'error': 'person not found'
    })
  }

  persons = persons.filter(p => p.id !== req.params.id)
  res.status(204).end()
})

export default router