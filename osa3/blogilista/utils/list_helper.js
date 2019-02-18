const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (previous, current) => {
        return previous.likes > current.likes
            ? previous
            : current
    }

    const favoriteBlog = blogs.reduce(reducer, {likes: -1})

    return favoriteBlog.likes !== -1
        ? favoriteBlog
        : undefined
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}