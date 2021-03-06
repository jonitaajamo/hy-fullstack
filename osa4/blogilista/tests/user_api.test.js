const User = require('../models/user')
const listHelper = require('../utils/list_helper')

describe('when there is initially one user at db', async() => {
    beforeEach(async() => {
        await User.deleteMany({})
        const user = new User({username: 'root', password: 'sekret'})
        await user.save()
    })

    test('creation succeeds with a fresh username', async() => {
        const usersAtStart = await listHelper.usersInDb()

        const newUser = {
            username: 'jonit',
            name: 'Joni Taajamo',
            password: 'salainen'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await listHelper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })
})