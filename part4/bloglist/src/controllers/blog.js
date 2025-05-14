import express from 'express'
import asyncHandler from 'express-async-handler'
import Blog from '../models/blog.js'

const router = express.Router()

router.post('/', asyncHandler(async (req, res, _next) => {
  const newBlog = new Blog(req.body)
  const savedBlog = await newBlog.save()
  res.status(201).json(savedBlog)
}))

router.get('/', asyncHandler(async (req, res, _next) => {
  const blogs = await Blog.find({})
  res.json(blogs)
}))

router.get('/:id', asyncHandler(async (req, res, _next) => {
  const blog = await Blog.findById(req.params.id)

  if (blog) {
    res.json(blog)
  }
  else {
    res.status(404).end()
  }
}))

export default router
