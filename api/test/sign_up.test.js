const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

let app = require('../index');
const models = require('../src/db/models');


describe("POST /sign_up", () => {

    afterEach(async function() {
      await models.User.destroy({
        where: {
          first_name: 'user',
          last_name: 'test'
        }
      });
    });

    it("Should return a status 200 if a new user is created", async function() {
      const res = await chai
                        .request(app)
                        .post('/sign-up')
                        .send({
                          first_name: 'user',
                          last_name: 'test',
                          email: 'user.test@hotmail.fr',
                          github: 'https://userTest@git.git.test.eu',
                          password: 'stringOFcaracters'
                        });

      expect(res.status).to.equal(200);
    });
  });
