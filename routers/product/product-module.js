const {Router} = require("express");

const create = require('./create');
const findAllByRestaurantId = require('./find-all-by-restaurant-id');
const findById = require('./find-by-id')

const router = Router().use(create, findAllByRestaurantId, findById);

module.exports = router;