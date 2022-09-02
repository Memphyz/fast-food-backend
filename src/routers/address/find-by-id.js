const {Router} = require("express");
const Address = require("../../models/Address");
const auth = require("../../utils/check-token");
const HTTPS = require("../../utils/responses");

const router = Router();

router.get('/:id', auth, (requisition, response) => {
     const {id} = requisition.params;
     Address.findById(id).then((address) => {
          response.status(HTTPS.OK).json(address)
     })
})

module.exports = router;