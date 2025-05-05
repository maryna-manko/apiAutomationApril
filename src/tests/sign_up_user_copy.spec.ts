import * as supertest from 'supertest'
import { faker } from "@faker-js/faker"

const request = supertest('http://localhost:8001/api/v1')
import { Response } from 'superagent'

interface UserData {
    name: string;
    email: string;
    password: string
    passwordConfirm: string;

}

describe('USER SING UP', () => {

    describe('POSITIVE TESTING with async/await', () => {
        it('should sign up a user', async () => {
            const userData: UserData = {
                "name": faker.person.fullName(),
                "email": faker.internet.email(),
                "password": "test12345",
                "passwordConfirm": "test12345",
                //"role": "user"
            };  
            console.log(userData);
            try {
                //Make the Post request
                const res = await request.post('/users/signup').send(userData).expect(201);
                //Log the response
                console.log(res.body)
                //Validate response body
                expect(res.body.status).toBe("success")

                expect(res.body.status).toBe("success");
                expect(res.body.data.user.name).toBe(userData.name);
                expect(typeof res.body.data.user.name).toBe("string");
                expect(res.body.data.user.email).toBe(userData.email.toLowerCase());
                expect(typeof res.body.data.user.email).toBe("string");
                expect(res.body.token).toBeDefined();
                expect(typeof res.body.token).toBe("string");

                // Additional checks for user object
                expect(res.body.data.user).toHaveProperty("_id");
                expect(res.body.data.user).not.toHaveProperty("password");

            } catch (error) {
                console.error("Error during sign up:", error);
                throw error; //Rethrow the error to fail the test
            }
        })
    })

    describe('POSITIVE TESTING with .then', () => {
        it('should sign up a user', async () => {
            const userData: UserData = {
                "name": faker.person.fullName(),
                "email": faker.internet.email(),
                "password": "test12345",
                "passwordConfirm": "test12345",
                //"role": "user"
            };  
            console.log(userData);
           //Make the Post request using .then
           return request
           .post('/users/signup')
           .send(userData)
           .expect(201)
           .then((res: Response) => {
            expect(res.body.status).toBe("success")
            expect(res.body.status).toBe("success");
            expect(res.body.data.user.name).toBe(userData.name);
            expect(typeof res.body.data.user.name).toBe("string");
            expect(res.body.data.user.email).toBe(userData.email.toLowerCase());
            expect(typeof res.body.data.user.email).toBe("string");
            expect(res.body.token).toBeDefined();
            expect(typeof res.body.token).toBe("string");

            // Additional checks for user object
            expect(res.body.data.user).toHaveProperty("_id");
            expect(res.body.data.user).not.toHaveProperty("password")
           })
           .catch((error) => {
            console.error("Error during sign up:", error);
            throw error; //Rethrow the error to fail the test
           })
        })
    })

    describe('POSITIVE TESTING with .end() and done()', () => {
        it.only('should sign up a user', (done) => {
            const userData = {
                "name": faker.person.fullName(),
                "email": faker.internet.email(),
                "password": "test12345",
                "passwordConfirm": "test12345",
                "role": "user"
            };  
            console.log(userData);
           //Make the Post request using .then
           request
           .post('/users/signup')
           .send(userData)
           .expect(201)
           .end((err: Error | null ,res: Response) => {
            if (err){
                console.error("Error during sign up:", err);
                return done(err)
            }
            try{
            expect(res.body.status).toBe("success")
            expect(res.body.status).toBe("success");
            expect(res.body.data.user.name).toBe(userData.name);
            expect(typeof res.body.data.user.name).toBe("string");
            expect(res.body.data.user.email).toBe(userData.email.toLowerCase());
            expect(typeof res.body.data.user.email).toBe("string");
            expect(res.body.token).toBeDefined();
            expect(typeof res.body.token).toBe("string");

            // Additional checks for user object
            expect(res.body.data.user).toHaveProperty("_id");
            expect(res.body.data.user).not.toHaveProperty("password")
            done()
           }catch(err) {
            console.error("Error during sign up:", err);
            done(err); //Rethrow the error to fail the test
           }
           })
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
            const res = await request.post('/users/signup').send(UserData);
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
            const res = await request.post('/users/signup').send(UserData);
            console.log(res.body)
            expect(res.status).toBe(400)
            expect(res.body.status).toBe("fail")
            expect(res.body.message).toBe("Missing required fields: email")
    })
})

})