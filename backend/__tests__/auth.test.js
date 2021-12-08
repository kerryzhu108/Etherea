const request = require('supertest')
const app = require("../src/app");


describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        first_name: "First",
        last_name: "Last",
        email: "test@gmail.com",
        password: "password",
        confirmPassword: "password"
      })
    console.log(res.body)
    expect(res.statusCode).toEqual(200)
  })
})