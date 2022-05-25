const {Router} = require("express");
const Restaurant = require("../../models/Restaurant");
const HTTPS = require("../../utils/responses");


const router = Router();

router.get('/:id', (requisition, response) => {
     try {
          Restaurant.findById(requisition.params.id).then((restaurant) => {
               response.status(HTTPS.OK).json(restaurant)
          })
     } catch (error) {
          response.status(HTTPS.INTERNAL_SERVER_ERROR).json({errors});
     }
});

module.exports = router;
