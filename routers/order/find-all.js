const {Router} = require("express");
const Order = require("../../models/Order");
const {id} = require("../../utils/me");
const HTTPS = require("../../utils/responses");

const router = Router()

router.get('/', (requisition, response) => {
     const {limit, page, sort} = requisition.params;
     Order.find().where({id: id(requisition)}).limit(limit || 20).skip(page || 0).sort(sort || '--created').then(orders => {
          response.status(HTTPS.OK).json(orders)
     })
});

module.exports = router;