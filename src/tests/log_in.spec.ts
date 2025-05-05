import { User } from "../../helper/interface";
import { deleteFunction, getUser, login, signUp } from "../../helper/user";
import * as supertest from "supertest";
const request = supertest("http://localhost:8001/api/v1");

describe('USER SIGN UP AND LOGIN', () => {
    const user: User = getUser("admin")

    let cookie: string;
    describe('POSITIVE TEST', () => {
        //Async/await + try and catch

        it('should signup, login and delete the user', async () => {


            try {
                //Make the Post request / signup
                const res = await signUp(user);
                expect(res.statusCode).toBe(201);
                expect(res.body.data.user.email).toEqual(user.email);
                expect(res.body.status).toEqual("success");
                //login user
                const loginRes = await login(user);
                expect(loginRes.statusCode).toBe(200);
                expect(loginRes.body.status).toBe("success");
                cookie = loginRes.headers["set-cookie"][0].split(";")[0];
                //delete user
                const deleteRes = await deleteFunction(cookie);
                expect(deleteRes.statusCode).toBe(200);
                expect(deleteRes.body.message).toBe("User deleted successfully");
                //login
                const loginAfterDeletion = await login(user);
                expect(loginAfterDeletion.statusCode).toBe(401);
                expect(loginAfterDeletion.body.message).toBe("Incorrect email or password");
            } catch (error) {
                console.error("Error during sign up:", error);
                throw error; //Rethrow the error to fail the test
            }
        })
    })
})


