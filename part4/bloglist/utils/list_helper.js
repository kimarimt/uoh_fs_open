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

export default {
  dummy,
  totalLikes,
  favoriteBlog
}