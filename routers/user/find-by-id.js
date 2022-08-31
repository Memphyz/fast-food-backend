const {Router} = require("express");
const User = require("../../models/User");
const auth = require("../../utils/check-token");
const HTTPS = require("../../utils/responses");

const router = Router();

router.get('/:id', auth, (requisition, response) => {
     User.findById(requisition.params.id).then((user) => {
          response.status(HTTPS.OK).json(user)
     })
});

module.exports = router;