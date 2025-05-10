import express from 'express'
import Person from '../models/person.js'

const router = express.Router()

router.post('/', async (req, res, next) => {
  try {
    const person = new Person(req.body)
    const savedPerson = await person.save()
    res.status(201).json(savedPerson)
  }
  catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const persons = await Person.find({})
    res.json(persons)
  }
  catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const person = await Person.findById(req.params.id)

    if (!person) {
      return res.status(400).send({ error: 'person not found' })
    }

    res.json(person)
  }
  catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const updatedPerson = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    if (!updatedPerson) {
      return res.status(400).send({ error: 'person not found' })
    }

    res.json(updatedPerson)
  }
  catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const deletedPerson = await Person.findByIdAndDelete(req.params.id)

    if (!deletedPerson) {
      return res.status(400).send({ error: 'person not found' })
    }

    res.json(deletedPerson)
  }
  catch (err) {
    next(err)
  }
})

export default router
