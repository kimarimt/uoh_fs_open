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
    await Blog.insertMany(helper.initialBlogs)
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
    test('a valid blog can be added', async () => {
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

    test('new blog\'s \'likes\' property defaults to 0, if it\'s missing from the request', async () => {
      const newBlog = {
        title: 'Traversal-resistant file APIs',
        author: 'Damien Neil',
        url: 'https://go.dev/blog/osroot',
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDB()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const lastBlog = blogsAtEnd[blogsAtEnd.length - 1]
      assert.strictEqual(lastBlog.likes, 0)
    })

    test('blog without a \'title\' is not added', async () => {
      const newBlog = {
        author: 'Damien Neil',
        url: 'https://go.dev/blog/osroot',
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDB()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test.only('blog without a \'url\' is not added', async () => {
      const newBlog = {
        title: 'Traversal-resistant file APIs',
        author: 'Damien Neil',
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDB()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })

  after(async () => {
    await mongoose.connection.close()
  })
})
