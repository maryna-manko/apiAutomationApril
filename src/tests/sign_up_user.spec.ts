import * as supertest from 'supertest'

const requests = supertest('http://localhost:8001/api/v1')

describe('USER SING UP', () => {

    describe('POSITIVE TESTING', () => {
        it.only('should sign up a user', async () => {
            const UserData = {
                "name": "John Doe",
                "email": "john5@example.com",
                "password": "mypassword123",
                "passwordConfirm": "mypassword123",
                "role": "user"
            }
            console.log(UserData);
            const res = await requests.post('/users/signup').send(UserData);
            console.log(res.body.message)
            expect(res.status).toBe(201)
            expect(res.body.status).toBe("success")
        })
    })

    describe('NEGATIVE TESTING', () => {
        it('should get an error when user is not in the body', async () => {
            const UserData = {
                "email": "john4@example.com",
                "password": "mypassword123",
                "passwordConfirm": "mypassword123",
                "role": "user"
            }
            console.log(UserData);
            const res = await requests.post('/users/signup').send(UserData);
            console.log(res.body)
            expect(res.status).toBe(400)
            expect(res.body.status).toBe("fail")
        })

        it('should get an error when password is not in the body', async () => {
            const UserData = {
                "email": "john4@example.com",
                "password": "mypassword123",
                "passwordConfirm": "mypassword123",
                "role": "user"
            }
            console.log(UserData);
            const res = await requests.post('/users/signup').send(UserData);
            console.log(res.body)
            expect(res.status).toBe(400)
            expect(res.body.status).toBe("fail")
            expect(res.body.message).toBe("Missing required fields: email")
    })
})

})