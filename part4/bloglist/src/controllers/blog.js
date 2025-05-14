import express from 'express'
import Blog from '../models/blog.js'

const router = express.Router()

router.post('/', async (req, res, next) => {
  try {
    const newBlog = new Blog(req.body)
    const savedBlog = await newBlog.save()
    res.status(201).json(savedBlog)
  }
  catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({})
    res.json(blogs)
  }
  catch (err) {
    next(err)
  }
})

export default router
