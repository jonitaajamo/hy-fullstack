const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async() => {
    await Blog.remove({})

    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('blogs are returned as json', async() => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
})

test('all blogs are returned', async() => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(initialBlogs.length)
})

test('blog has id', async() => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('new blog can be posted', async() => {
    const newBlog = {
        title: "testtitle",
        author: "testauthor",
        url: "testurl",
        likes: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', 'application/json; charset=utf-8')

    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(initialBlogs.length + 1)

})

test('blog without like field has 0 likes', async() => {
    const newBlog = {
        title: "testtitle",
        author: "testauthor",
        url: "testurl"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', 'application/json; charset=utf-8')

    const response = await api.get('/api/blogs')

    expect(response.body[2].likes).toBe(0)
})

test('blog without title and/or url can\'t be added', async() => {
    const newBlog = {
        author: "testauthor",
        likes: "0"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test('blog can be deleted', async() => {
    await api
        .delete('/api/blogs/5a422a851b54a676234d17f7')
        .expect(204)
})

afterAll(() => {
    mongoose
        .connection
        .close()
})

const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    }, {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful" +
                ".html",
        likes: 5,
        __v: 0
    }
]