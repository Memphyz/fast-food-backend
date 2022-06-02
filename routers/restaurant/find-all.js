const {Router} = require("express");
const Restaurant = require("../../models/Restaurant");
const HTTPS = require("../../utils/responses");

const router = Router();

router.get('/', (requisition, response) => {
     try {
          const anon = requisition.query.anon;
          Restaurant.find().limit(requisition.query.limit || 20)
               .skip(requisition.query.page || 0)
               .sort(requisition.query.sort || '--created').then((restaurants) => {
                    response.status(HTTPS.OK).json(restaurants);
               })
     } catch (error) {
          response
               .status(HTTPS.INTERNAL_SERVER_ERROR)
               .json({error: error, message: error?.message});
     }
});

module.exports = router;