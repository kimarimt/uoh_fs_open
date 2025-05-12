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

const mostLikes = blogs => {
  return _(blogs)
    .groupBy('author')
    .map((objs, key) => ({
      author: key,
      likes: _.sumBy(objs, 'likes')
    }))
    .orderBy('likes', 'desc')
    .first()
}

export default {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}