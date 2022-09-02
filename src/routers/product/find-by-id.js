const {Router} = require("express");
const Product = require("../../models/Product");
const auth = require("../../utils/check-token");
const HTTPS = require("../../utils/responses");


const router = Router();

router.get('/:id', auth, (requisition, response) => {
     const {id} = requisition.params;

     Product.findById(id).then((product) => {
          response.status(HTTPS.OK).json(product)
     })
})

module.exports = router;