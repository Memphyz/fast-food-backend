const {Router} = require("express");
const Product = require("../../models/Product");
const HTTPS = require("../../utils/responses");


const router = Router();

router.get('/restaurant/:id', (requisition, response) => {
     const {id, limit, page, sort} = requisition.params;
     Product.find({restaurant: id}).limit(limit || 20).skip(page || 0).sort(sort || '--created').then((products) => {
          response.status(HTTPS.OK).json(products);
     })
});

module.exports = router;