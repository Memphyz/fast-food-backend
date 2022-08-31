const {Router} = require("express");

const create = require('./create');
const findAll = require('./find-all');
const findById = require('./find-by-id');
const update = require('./update');

const router = Router().use(create, findAll, findById, update);

module.exports = router;