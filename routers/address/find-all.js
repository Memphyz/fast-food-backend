const {Router} = require("express");
const Address = require("../../models/Address");
const HTTPS = require("../../utils/responses");
const jwt = require("jsonwebtoken");

const router = Router();

router.get('/', async (requisition, response) => {
     const secret = process.env.SECRET;
     const authorization = requisition.headers.authorization.split(' ')[1],
          decoded = jwt.verify(authorization, secret);
     let {limit, page, sort, projection, search} = requisition.query;
     limit ||= 20;
     page ||= 0;
     Address.find({user: decoded.id, name: {'$regex': (search || ''), '$options': 'i'}}, projection).limit(limit).skip((limit * page)).sort(sort || {created: -1}).then((addreses) => {
          response.status(HTTPS.OK).json(addreses);
     })
});

module.exports = router;