import express from 'express'
import mongoose from 'mongoose'
import config from '../utils/config.js'
import blogsRouter from './controllers/blog.js'

const app = express()

mongoose.connect(config.MONGODB_URI)

app.use(express.json())
app.use('/api/blogs', blogsRouter)

app.listen(config.PORT, () => {
  console.log(`[server] running on port ${config.PORT}`)
})
