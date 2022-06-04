const {Router} = require("express");
const Product = require("../../models/Product");
const HTTPS = require("../../utils/responses");


const router = Router();

router.get('/:id', (requisition, response) => {
     const id = requisition.params.id;
     Product.find({restaurant: id}).then((products) => {
          response.status(HTTPS.OK).json(products);
     })
});

module.exports = router;