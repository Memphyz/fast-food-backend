const {Router} = require("express");
const Restaurant = require("../../models/Restaurant");
const HTTPS = require("../../utils/responses");

const router = Router();

router.get('/', (requisition, response) => {
     try {
          Restaurant.find().limit(requisition.query.limit || 20)
               .skip(requisition.query.page || 0)
               .sort(requisition.query.sort || '--created').then((restaurants) => {
                    response.status(HTTPS.OK).json(restaurants);
               })
     } catch (error) {
          response.status(HTTPS.INTERNAL_SERVER_ERROR).json({message: error.message, error});
     }
});

module.exports = router;