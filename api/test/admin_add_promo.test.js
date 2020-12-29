const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

const decache = require('decache');

const sinon = require("sinon");

decache('../src/middlewares');
const middlewares = require('../src/middlewares');

let app;
const models = require('../src/db/models');

describe("Route /admin => promo", function() {
   let verifyTokenStub;
   let isAdminStub;

   before(async function() {
     await models.Promo.create({
       name: 'promo_auto_generated',
       is_active: true
     });
   })

   before( async function() {
     if (this.sinon == null)
      this.sinon = await sinon.createSandbox();
     //replace the middleware_verify_token function in the middleware module with this fake function
     /*verifyTokenStub = */this.sinon.stub(middlewares, 'middleware_verify_token').callsFake((req, res, next) => {
       next();
     });
     /*isAdminStub = */this.sinon.stub(middlewares, 'middleware_is_admin').callsFake((req, res, next) => {next()});
     decache('../index');
     app = require('../index');
   });

   /*
   afterEach(function() {
     //this.sinon.restore();
     //verifyTokenStub.restore();
     //isAdminStub.restore();
   });
   */

   after(async function() {
     await models.Promo.destroy({
       where: {
         name: 'promo_test'
       }
     });
     await models.Promo.destroy({
       where: {
         name: 'promo_auto_generated'
       }
     });
     this.sinon.restore();
   })


   it("/add-promo should return a status 200 if a promotion was created", async function() {
     const res = await chai
                       .request(app)
                       .post('/admin/add-promo')
                       .send({
                         name: 'promo_test',
                         is_active: true
                       });
     expect(res.status).to.equal(200);
   });


   it("/get-promos should return a status 200 and all the promotions who exist", async function() {
     const res = await chai
                        .request(app)
                        .get('/admin/get-promos')
                        .send();
      expect(res.status).to.equal(200);
      expect(res.body).to.be.a('array');
      expect(res.body[res.body.length - 2]).to.include({ name: 'promo_auto_generated' });
      expect(res.body[res.body.length - 1]).to.include({ name: 'promo_test' });
   })
 });
