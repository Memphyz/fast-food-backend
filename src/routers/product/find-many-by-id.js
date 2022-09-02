const {Router} = require("express");
const {default: mongoose} = require("mongoose");
const Product = require("../../models/Product");
const auth = require("../../utils/check-token");
const HTTPS = require("../../utils/responses");

const router = Router();

router.get('/', auth, (requisition, response) => {
     const ids = requisition.query.ids;
     Product.find({
          '_id': {$in: Array.isArray(ids) ? ids.map(id => mongoose.Types.ObjectId(id)) : ids}
     }).then((data) => {
          response.status(HTTPS.OK).json(data)
     })
})

module.exports = router;