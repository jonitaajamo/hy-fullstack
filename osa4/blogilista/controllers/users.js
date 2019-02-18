const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async(request, response) => {
    const users = await User
        .find({})
        .populate('blogs')

    response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async(request, response, next) => {
    try {
        const body = request.body

        if (body.password.length <= 2) {
            return res
                .status(400)
                .json({error: "Password min length = 3"})
        } else if (body.username.length <= 2) {
            return res
                .status(400)
                .json({error: "Username min length = 3"})
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({username: body.username, name: body.name, passwordHash})

        const savedUser = await user.save()

        response.json(savedUser)
    } catch (errror) {
        next(errror)
    }
})

module.exports = usersRouter