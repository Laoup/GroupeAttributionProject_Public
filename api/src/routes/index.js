const { middleware_verify_token, middleware_is_admin } = require('../middlewares');
const { NotFound } = require('../utils/errors.js');
const wrapAsync = require('../utils/wrapAsync.js');
const router_sign = require('./sign.routes.js');
const router_token = require('./token.routes.js');
const router_promo = require('./admin/promo.routes.js');
const router_unprotected = require('./unprotected/unprotected.routes.js');

/*
const test = (req, res, next) => {
  try {
    res.status(200).send("route test: OK");
  } catch (e) {
    console.log(e);
    throw new GeneralError(e);
    next(e);
  }
};
*/

const unknow_route = wrapAsync((req, res, next) => {
  throw new NotFound("Sorry the route you looking for doesn't exist");
});

module.exports = (app) => {
  app.use(router_unprotected);
  app.use(router_sign);
  app.use(router_token);
  app.use("/admin",
    [middleware_verify_token, middleware_is_admin],
    router_promo
  );
  app.all("*", unknow_route);
}
