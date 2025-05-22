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
    describe('all blogs', () => {
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

    describe('reading a specific blog', () => {
      test('succeeds with a valid id', async () => {
        const blogs = await helper.blogsInDB()
        const blogToView = blogs[0]

        const resultBlog = await api
          .get(`/api/blogs/${blogToView.id}`)
          .expect(200)
          .expect('Content-Type', /application\/json/)

        assert.deepStrictEqual(resultBlog.body, blogToView)
      })

      test('fails with 404 if blog doesn\'t exist', async () => {
        const nonExistingId = await helper.nonExistingId()

        await api
          .get(`/api/blogs/${nonExistingId}`)
          .expect(404)
      })

      test('fails with 400 if id is invalid', async () => {
        const invalidId = '68249d1a20b823bae2221'

        await api
          .get(`/api/blogs/${invalidId}`)
          .expect(400)
      })
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

    test('blog without a \'url\' is not added', async () => {
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

  describe('deleting blogs', () => {
    test('deleting a blog with a valid id succeeds with a status code of 204', async () => {
      const blogsAtStart = await helper.blogsInDB()
      const firstBlog = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${firstBlog.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDB()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)

      const id = blogsAtStart.map(b => b.id)
      assert(!blogsAtEnd.includes(id))
    })

    test('deleting a blog fails with a 404 is blog is not found', async () => {
      const nonExistingId = await helper.nonExistingId()

      await api
        .delete(`/api/blogs/${nonExistingId}`)
        .expect(404)
    })
  })

  describe('editing blogs', () => {
    test.only('blog with a valid id can be liked', async () => {
      const blogsAtStart = await helper.blogsInDB()
      const firstBlog = blogsAtStart[0]

      await api
        .put(`/api/blogs/${firstBlog.id}`)
        .expect(200)

      const blogsAtEnd = await helper.blogsInDB()
      const newFirstBlog = blogsAtEnd[0]

      assert.strictEqual(newFirstBlog.likes, firstBlog.likes + 1)
    })

    test.only('editing a blog with an invalid id returns a 404', async () => {
      const id = await helper.nonExistingId()

      await api
        .put(`/api/blogs/${id}`)
        .expect(404)
    })
  })

  after(async () => {
    await mongoose.connection.close()
  })
})
