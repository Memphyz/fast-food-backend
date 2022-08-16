const {Router} = require("express");
const Order = require("../../models/Order");
const {id} = require("../../utils/me");
const HTTPS = require("../../utils/responses");

const router = Router()

router.get('/', async (requisition, response) => {
     let {limit, page, sort} = requisition.query;
     limit ||= 20;
     page ||= 0;
     Order.find().limit(limit).skip((limit * page)).sort(sort || {created: -1}).where({id: id(requisition)}).exec().then(orders => {
          response.status(HTTPS.OK).json(orders)
     })
});

module.exports = router;