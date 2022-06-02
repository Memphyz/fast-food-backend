

const {Router} = require('express');
const create = require('./create');

const router = Router().use(create)

module.exports = router;