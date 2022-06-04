const {Router} = require("express");

const create = require('./create');
const findAllById = require('./find-all-by-id');

const router = Router().use(create, findAllById);

module.exports = router;