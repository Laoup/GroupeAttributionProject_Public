const express = require('express');
const models = require('../db/models');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { UnprocessableEntity, Unauthorized } = require('../utils/errors.js');
const wrapAsync = require('../utils/wrapAsync.js');

const router = express.Router();

router.route('/sign-up')
.post(
  wrapAsync(async (req, res, next) => {
      const { first_name, last_name,
        github, email, promo, password } = req.body;

      if (!first_name)
        throw new UnprocessableEntity("Missing first_name for /sign-up");
      else if (!last_name)
        throw new UnprocessableEntity("Missing last_name for /sign-up");
      else if (!github)
        throw new UnprocessableEntity("Missing github for /sign-up");
      else if (!email)
        throw new UnprocessableEntity("Missing email for /sign-up");
      else if (!password)
        throw new UnprocessableEntity("Missing password for /sign-up");

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      await models.User.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        github: github,
        promo: promo,
        password: hash,
        is_admin: false,
        is_validate: 0,
      });

      res.status(200).send();
  })
);

router.route("/sign-in")
.post(wrapAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password)
      throw new UnprocessableEntity("missing email or password for /sign-in");

    const user = await models.User.findOne({
      where: {
        email: email
      }
    });
    if (user === null)
      throw new Unauthorized(`user with email ${email} was not found`);
    if (user.is_validate === 0)
      throw new Unauthorized(`user: Your account haven't been accepted yet`);
    const check_password = await bcrypt.compare(password, user.password);
    if (check_password === false)
      throw new Unauthorized(`invalid password for user ${email}`);

    /* On créer le token CSRF */
    /* randomBytes(64).toString('hex') => génére un token aléatoire.caracterelisible */
    const xsrfToken = crypto.randomBytes(64).toString('hex');

    //A terme il faudra ajouter le last_name pour éviter les doublons dans middleware_verify_token
    const payload = {
      first_name: user.first_name,
      last_name: user.last_name,
      promo: user.promo,
      is_admin: user.is_admin,
      xsrfToken
    };
    //accessToken valid during 2.5 minutes
    const accessToken = await jwt.sign(payload, 'secret_sign', {
      expiresIn: 90
    });

    /* On créer le refresh token et on le stocke en BDD */
    const refreshToken = crypto.randomBytes(128).toString('base64');
    await models.RefreshToken.create({
      userId: user.id,
      token: refreshToken,
      expiresAt: Date.now() + 2592000000
    });

    /* On créer le cookie contenant le JWT (accessToken) */
    res.cookie('access_token', accessToken, {
      //httpOnly: true,
      /*
      secure ==> Seulement avec https
      secure: true,
      */
      //maxAge = 2.5 minutes
      maxAge: 150000
    });

    /* On créer le cookie contenant le refresh token */
    res.cookie('refresh_token', refreshToken, {
      //httpOnly: true,
      /*
      secure ==> Seulement avec https
      secure: true,
      */
      //maxAge = 10 minutes
      maxAge: 600000,
      //a quoi sert path ?
      //path: '/token'
    });

    /* On envoie une reponse JSON contenant les durées de vie des tokens et le token CSRF */
    res.status(200).json({
      accessTokenExpiresIn: 150000,
      refreshTokenExpiresIn: 600000,
      xsrfToken
    });

    /*
    res.status(200).json({
      token: `Bearer ${token}`
    });
    */
  })
);

module.exports = router;
