const {Router} = require("express");
const Restaurant = require("../../models/Restaurant");
const HTTPS = require("../../utils/responses");

const router = Router();

router.get('/', (requisition, response) => {
     try {
          const anon = requisition.query.anon;
          let {limit, page, sort, search} = requisition.query;
          limit ||= 20;
          page ||= 0;
          Restaurant.find({name: {'$regex': search || '', '$options': 'i'}}, 'active close created createdby freight id kitchen name open photo rate').limit(limit).skip((limit * page)).sort(sort || '--created').then((restaurants) => {
               response.status(HTTPS.OK).json(restaurants);
          })
     } catch (error) {
          response
               .status(HTTPS.INTERNAL_SERVER_ERROR)
               .json({error: error, message: error?.message});
     }
});

module.exports = router;