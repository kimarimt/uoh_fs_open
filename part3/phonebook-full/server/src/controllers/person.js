import express from 'express'
import Person from '../models/person.js'

const router = express.Router()

router.post('/', async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ 'error': 'name is required' })
  }

  if (!req.body.number) {
    return res.status(400).json({ 'error': 'number is required' })
  }

  try {
    const person = new Person(req.body)
    const savedPerson = await person.save()
    res.status(201).json(savedPerson)
  } catch (err) {
    res.status(400).json({ 'error': err })
  }
})

router.get('/', async (req, res) => {
  const persons = await Person.find({})
  res.json(persons)
})

router.get('/:id', async (req, res) => {
  const person = await Person.findById(req.params.id)

  if (!person) {
    return res.status(400).json({ 'error': 'person not found' })
  }

  res.json(person)
})

router.delete('/:id', async (req, res) => {
  try {
    const deletedPerson = await Person.findByIdAndDelete(req.params.id)
    res.json(deletedPerson)
  } catch (err) {
    res.status(400).json({ 'error': err })
  }
})

export default router