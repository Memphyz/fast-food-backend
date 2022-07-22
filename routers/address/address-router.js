const {Router} = require("express");

const create = require('./create');
const findAll = require('./find-all');

const router = Router().use(create, findAll);

module.exports = router;