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

export default router
