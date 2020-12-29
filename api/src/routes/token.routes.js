const express = require('express');
const models = require('../db/models');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { Unauthorized, NotFound } = require('../utils/errors.js');
const wrapAsync = require('../utils/wrapAsync.js');

const router = express.Router();

router.route("/token-refresh")
.get(wrapAsync(async (req, res, next) => {
    /*
    const { first_name, last_name } = req.body;

    const user = await models.User.findOne({
      where: {
        first_name,
        last_name
      }
    });
    if (user == null)
      throw new NotFound("Impossible to associate user and refreshToken");
    */
    const { cookies } = req;

    /* On vérifie que le JWT est présent dans les cookies de la requête */
    if (!cookies || !cookies.refresh_token)
      throw new Unauthorized('Missing token in cookie or missing cookie');
    const refreshToken = cookies.refresh_token;

    const retrievedRefreshToken = await models.RefreshToken.findOne({
      where: {
        token: refreshToken
      }
    })
    if (retrievedRefreshToken == null)
      throw new NotFound("Impossible to associate user and refreshToken");

    const user = await models.User.findOne({
      where: {
        id: retrievedRefreshToken.userId
      }
    });

      const xsrfToken = crypto.randomBytes(64).toString('hex');

      const payload = {
        first_name: user.first_name,
        last_name: user.last_name,
        promo: user.promo,
        is_admin: user.is_admin,
        xsrfToken
      };
      const accessToken = await jwt.sign(payload, 'secret_sign', {
        expiresIn: 90
      });

      res.cookie('access_token', accessToken, {maxAge: 150000});

      res.status(200).json({
        accessTokenExpiresIn: 150000,
        xsrfToken
      });
  })
);

module.exports = router;
