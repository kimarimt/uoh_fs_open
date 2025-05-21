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

  if (!blog) {
    return res.status(404).send({ error: 'blog not found!' })
  }

  res.json(blog)
}))

router.delete('/:id', asyncHandler(async (req, res, _next) => {
  const blog = await Blog.findById(req.params.id)

  if (!blog) {
    return res.status(404).send({ error: 'blog not found' })
  }

  await Blog.findByIdAndDelete(blog.id)
  res.status(204).end()
}))

export default router
