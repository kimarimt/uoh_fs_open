import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import blogsRouter from './controllers/blog.js'

dotenv.config()

const app = express()
const port = process.env.PORT
const mongoUrl = process.env.MONGODB_URI

mongoose.connect(mongoUrl)

app.use(express.json())
app.use('/api/blogs', blogsRouter)

app.listen(port, () => {
  console.log(`[server] running on port ${port}`)
})