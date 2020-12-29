const jwt = require('jsonwebtoken');
const { User } = require('../db/models');
const { GeneralError, Unauthorized, Forbidden } = require('../utils/errors.js');
const wrapAsync = require('../utils/wrapAsync.js');

const middleware_is_admin = (req, res, next) => {
  try {
    const decoded = req.decode;

    if (decoded.is_admin === true)
      next();
    else
      throw new Forbidden("You aren't admin.");
  } catch (e) {
    next(e);
  }
};

const middleware_verify_token = async (req, res, next) => {
  try {
    const { cookies, headers } = req;

    /* On vérifie que le JWT est présent dans les cookies de la requête */
    if (!cookies || !cookies.access_token)
      throw new Unauthorized('Missing access token in cookie or missing cookie');
    const accessToken = cookies.access_token;

    /* On vérifie que le token CSRF est présent dans les en-têtes de la requête */
    if (!headers || !headers['x-xsrf-token'])
      throw new Unauthorized('Missing XSRF token in headers or missing header');
    const xsrfToken = headers['x-xsrf-token'];

    /* On vérifie et décode le JWT à l'aide du secret et de l'algorithme utilisé pour le générer */
    const decodedToken = await jwt.verify(accessToken, 'secret_sign');

    /* On vérifie que le token CSRF correspond à celui présent dans le JWT  */
    if (xsrfToken !== decodedToken.xsrfToken)
      throw new Unauthorized('Bad xsrf token');

    /* On vérifie que l'utilisateur existe bien dans notre base de données */
    const { first_name, last_name } = decodedToken;
    const user = await User.findOne({ where: { first_name, last_name } });
    if (!user)
      throw new Forbidden(`User ${first_name} ${last_name} not exists`);

    req.decode = decodedToken;

    next();
  } catch (e) {
    next(e);
  }
};

const middleware_error_handler = (err, req, res, next) => {
  console.log("middleware error");
  console.log(err.message);
  if (err instanceof GeneralError) {
    return res
            .status(err.getCode())
            .send(`${err.message}`);
  }

  return res.status(500).send(`${err.message}`);
}

module.exports = {
  middleware_is_admin,
  middleware_verify_token,
  middleware_error_handler
};


/* Je préfère l'autre méthode car j'ai peur qu'il puisse exister
// des erreurs non gérées avec celle-ci. => peut-être solution avec process.on pour gérer les erreurs ?
*/
/*
const middleware_verify_token = async (req, res, next) => {
    const { cookies, headers } = req;

    /* On vérifie que le JWT est présent dans les cookies de la requête */
/*  if (!cookies || !cookies.access_token)
      return (next(new Unauthorized('Missing access token in cookie or missing cookie')));
    const accessToken = cookies.access_token;

    /* On vérifie que le token CSRF est présent dans les en-têtes de la requête */
/*    if (!headers || !headers['x-xsrf-token'])
      return(next(new Unauthorized('Missing XSRF token in headers or missing header')));
    const xsrfToken = headers['x-xsrf-token'];

    /* On vérifie et décode le JWT à l'aide du secret et de l'algorithme utilisé pour le générer */
/*    const decodedToken = await jwt.verify(accessToken, 'secret_sign');

    /* On vérifie que le token CSRF correspond à celui présent dans le JWT  */
/*    if (xsrfToken !== decodedToken.xsrfToken)
      return(next(new Unauthorized('Bad xsrf token')));

    /* On vérifie que l'utilisateur existe bien dans notre base de données */
/*    const { first_name, last_name } = decodedToken;
    const user = await User.findOne({ where: { first_name, last_name } });
    if (!user)
      return(next(new Forbidden(`User ${first_name} ${last_name} not exists`)));

    req.decode = decodedToken;

    next();
};
*/
