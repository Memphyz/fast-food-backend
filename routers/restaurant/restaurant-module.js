const {Router} = require("express");

const create = require('./create');
const findAll = require('./find-all');
const findById = require('./find-by-id');

const router = Router().use(create, findAll, findById);

module.exports = router;