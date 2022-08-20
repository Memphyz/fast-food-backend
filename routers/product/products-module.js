const {Router} = require("express");
const findManyById = require('./find-many-by-id')
const createMany = require('./create_many')
const router = Router();

router.use(findManyById, createMany);

module.exports = router;