import assert from 'node:assert'
import { test, after, describe, beforeEach } from 'node:test'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../src/app.js'
import helper from './test_helper.js'
import Blog from '../src/models/blog.js'

const api = supertest(app)

describe('Blog API testing', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const newBlogs = helper.initialBlogs.map(b => new Blog(b))
    const blogPromises = newBlogs.map(b => b.save())
    await Promise.all(blogPromises)
  })

  describe.only('reading blogs', () => {
    test('blogs are return as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
      const res = await api.get('/api/blogs')
      assert.strictEqual(res.body.length, helper.initialBlogs.length)
    })
  })

  after(async () => {
    await mongoose.connection.close()
  })
})
