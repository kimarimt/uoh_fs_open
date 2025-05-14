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

  describe('reading blogs', () => {
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

    test('blog objects have an \'id\' property', async () => {
      const res = await api.get('/api/blogs')
      const firstBlog = res.body[0]

      assert(Object.keys(firstBlog).includes('id'))
    })
  })

  describe('creating blogs', () => {
    test.only('a valid blog can be added', async () => {
      const newBlog = {
        title: 'Traversal-resistant file APIs',
        author: 'Damien Neil',
        url: 'https://go.dev/blog/osroot',
        likes: 0,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDB()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(b => b.title)
      assert(titles.includes(newBlog.title))
    })
  })

  after(async () => {
    await mongoose.connection.close()
  })
})
