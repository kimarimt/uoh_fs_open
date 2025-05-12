import { test, describe } from 'node:test'
import assert from 'node:assert'
import listHelper from '../utils/list_helper.js'

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 6,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  },
  {
    _id: '68216ae896710c3fc7fff94a',
    title: 'More predictable benchmarking with testing.B.Loop',
    author: 'Junyang Shao',
    url: 'https://go.dev/blog/testing-b-loop',
    likes: 12,
    __v: 0
  }
]

test('dummy returns one', () => {
  const blogs = []
  const got = listHelper.dummy(blogs)
  assert.strictEqual(got, 1)
})

describe('total likes', () => {
  test('empty blog list returns 0', () => {
    const emptyBlogs = []
    const got = listHelper.totalLikes(emptyBlogs)
    assert.strictEqual(got, 0)
  })

  test('returns the correct number of likes', () => {
    const got = listHelper.totalLikes(blogs)
    assert.strictEqual(got, 54)
  })
})

describe('favorite blog', () => {
  test('empty list returns an empty object', () => {
    const emptyBlogs = []
    const got = listHelper.favoriteBlog(emptyBlogs)
    assert.deepStrictEqual(got, {})
  })

  test('returns the correct blog when multiple blogs have the most likes', () => {
    const expected = blogs[blogs.length - 1]
    const got = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(got, expected)
  })

  test('returns the blog with most likes', () => {
    const expected = blogs[blogs.length - 1]
    const got = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(got, expected)
  })
})

describe('most blogs', () => {
  test('returns undefined when list is empty', () => {
    const expected = undefined
    const got = listHelper.mostBlogs([])
    assert.strictEqual(got, expected)
  })

  test('returns the correct author when multple authors have the same frequency', () => {
    const expected = {
      author: "Edsger W. Dijkstra",
      blogs: 3
    }
    const got = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(got, expected)
  })

  test('returns the author with the most blogs', () => {
    const expected = {
      author: "Edsger W. Dijkstra",
      blogs: 3
    }
    const got = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(got, expected)
  })
})