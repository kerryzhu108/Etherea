const request = require('supertest')
const app = require("../src/app");


describe('Post /themesTasks/:themeID', () => {
  it('should successfully a new task', async () => {
    const res = await request(app)
      .post('/themesTasks/1')
      .send({
          descript: "test descript", 
          taskName: "test task name", 
          points: 20
        })
    expect(res.statusCode).toEqual(200)
  })
})

describe('Post /themesAll', () => {
  it('should add a new theme to the list of themes.', async () => {
    const res = await request(app)
      .post('/themesAll')
      .send({
        theme: "test theme", 
        statName: "test stat name", 
        multiplier: 2, 
        datelaunched: "2022-02-01", 
        color: "#F2BD7C"
      })
    expect(res.statusCode).toEqual(200)
  })
})