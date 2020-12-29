const express = require('express');
const models = require("../../db/models");
const wrapAsync = require('../../utils/wrapAsync.js');

const router = express.Router();

router.route("/get-promos-name")
.get(wrapAsync( async (req, res, next) => {
    const promoNames = await models.Promo.findAll({
      attributes: ['name']
    });

    console.log(promoNames);
    res.status(200).json(promoNames);
  })
);

module.exports = router;
