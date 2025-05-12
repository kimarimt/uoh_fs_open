import _ from 'lodash'

const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  return blogs
    .reduce((prev, current) => prev + current.likes, 0)
}

const favoriteBlog = blogs => {
  return blogs
    .reduce((prev, current) => prev.likes > current.likes ? prev : current, {})
}

const mostBlogs = blogs => {  
  return _(blogs)
    .countBy('author')
    .map((blogs, author) => {return {author: author, blogs: blogs}})
    .orderBy('blogs', 'desc')
    .first()
}

export default {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}