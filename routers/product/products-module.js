const {Router} = require("express");
const findManyById = require('./find-many-by-id')
const createMany = require('./create_many')
const updateMany = require('./update_many')
const router = Router();

router.use(findManyById, createMany, updateMany);

module.exports = router;