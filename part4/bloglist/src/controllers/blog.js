import express from 'express'
import Blog from '../models/blog.js'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const newBlog = new Blog(req.body)
    const savedBlog = await newBlog.save()
    res.status(201).json(savedBlog)
  } catch (err) {
    res.status(400).json({error: err.message})
  }
})

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({})
    res.json(blogs)
  } catch (err) {
    res.status(400).json({error: err.message})
  }
})

export default router