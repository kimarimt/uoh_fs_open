import Blog from '../src/models/blog.js'

const initialBlogs = [
  {
    title: 'More predictable benchmarking with testing.B.Loop',
    author: 'Junyang Shao',
    url: 'https://go.dev/blog/testing-b-loop',
    likes: 0,
  },
  {
    title: 'Goodbye core types - Hello Go as we know and love it!',
    author: 'Robert Griesemer',
    url: 'https://go.dev/blog/coretypes',
    likes: 0,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'Test Title',
    author: 'Test Author',
    url: 'https://www.google.com',
    likes: 0,
  })

  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

export default {
  initialBlogs,
  nonExistingId,
  blogsInDB,
}
