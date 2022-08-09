const {Router} = require("express");
const {default: mongoose} = require("mongoose");
const Restaurant = require("../../models/Restaurant");
const auth = require("../../utils/check-token");
const HTTPS = require("../../utils/responses");

const router = Router();

router.use('/', auth, (requisition, response) => {
     const ids = requisition.query.ids;
     Restaurant.find({
          '_id': {$in: Array.isArray(ids) ? ids.map(id => mongoose.Types.ObjectId(id)) : ids}
     }).then((data) => {
          response.status(HTTPS.OK).json(data)
     })
});

module.exports = router;