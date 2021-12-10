const request = require('supertest')
const app = require("../src/app");


describe('Post /auth/register', () => {
  it('should successfully create an user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        first_name: "First",
        last_name: "Last",
        email: "test@gmail.com",
        password: "password",
        confirmPassword: "password"
      })
    expect(res.statusCode).toEqual(200)
  })
})

describe('Post /auth/login', () => {
  it('should return with userid and tokens', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: "test@gmail.com",
        password: "password",
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('userid')
    expect(res.body).toHaveProperty('tokens')
  })
})