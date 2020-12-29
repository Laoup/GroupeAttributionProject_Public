const express = require('express');
const models = require('../../db/models');
const { BadRequest, UnprocessableEntity } = require('../../utils/errors.js');
const wrapAsync = require('../../utils/wrapAsync.js');

const router = express.Router();

router.route("/add-promo")
.post(wrapAsync(async (req, res, next) => {
  console.log(req.body);
    const { name, is_active } = req.body;

    if (!name || is_active === undefined)
      throw new BadRequest("missing promo name or promo: is_active for /add_promo");

    await models.Promo.create({
      name: name,
      is_active: is_active
    });

    res.status(200).send(`Promo ${name} created`);
  })
);

router.route("/get-promos")
.get(wrapAsync(async (req, res, next) => {
    const promos = await models.Promo.findAll({
      raw: true
    });
    res.status(200).send(promos);
  })
);

// mettre les routes "get-unvalidated-account" & "validate-account" dans un autre fichier
router.route("/get-unvalidated-account")
.get(wrapAsync( async (req, res, next) => {
  const users = await models.User.findAll({
    where: {
        is_validate: 0
      },
      attributes: ['first_name', 'last_name', 'email', 'promo'],
      raw: true
    });
  console.log("unvalidate people answer = ");
  console.log(users);
  res.status(200).send(users);
  })
);

router.route("/account")
.patch(wrapAsync( async (req, res, next) => {
  const { email } = req.body;

  if (!email)
    throw new UnprocessableEntity("Missing email for [PATCH] /validate-account");
  await models.User.update({ is_validate: 1 }, {
      where: {
        email
      }
    });
  res.status(204).send();
  })
)
.delete(wrapAsync( async (req, res, next) => {
  const { email } = req.body;

  if (!email)
    throw new UnprocessableEntity("Missing email for [DELETE] /validate-account");
  await models.User.destroy({
      where: {
          email
      }
    });
  res.status(204).send();
  })
);

module.exports = router;
