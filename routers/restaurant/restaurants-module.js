const {Router} = require("express");
const findManyById = require('./find-many-by-id')

const router = Router();

router.use(findManyById);

module.exports = router;