const supertest = require("supertest");
const app = require("../index.js");

describe("POST /login", () => {
  it("it should has status code 200", (done) => {
    supertest(app)
      .post("/login")
      .send({ username: 'test', password: 'unknown' })
      .expect(208)
      .end((err, res) => {
        if (err) done(err.message);
        done();
      });
  });
});