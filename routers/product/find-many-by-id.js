const {Router} = require("express");
const auth = require("../../utils/check-token");
const HTTPS = require("../../utils/responses");

const router = Router();

router.get('/:ids', auth, (requisition, response) => {
     const params = requisition.params;
     response.status(HTTPS.OK).json(params.ids)
})

module.exports = router;