const {Router} = require("express");
const Address = require("../../models/Address");
const HTTPS = require("../../utils/responses");
const jwt = require("jsonwebtoken");

const router = Router();

router.get('/', async (requisition, response) => {
     const secret = process.env.SECRET;
     const authorization = requisition.headers.authorization.split(' ')[1],
          decoded = jwt.verify(authorization, secret);
     const {limit, page, sort} = requisition.params;
     Address.find({user: decoded.id}).limit(limit || 20).skip(page || 0).sort(sort || {created: -1}).then((addreses) => {
          console.log(addreses);
          response.status(HTTPS.OK).json(addreses);
     })
});

module.exports = router;