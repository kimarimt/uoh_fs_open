import express from 'express'
import mongoose from 'mongoose'
import config from './utils/config.js'
import blogsRouter from './controllers/blog.js'
import middleware from './utils/middleware.js'

const app = express()

mongoose.connect(config.MONGODB_URI)

app.use(express.json())
app.use('/api/blogs', blogsRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpointHandler)

export default app
