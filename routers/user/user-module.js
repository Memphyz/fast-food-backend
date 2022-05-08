const { Router } = require("express");

const create = require("./create");

const user_endpoints = Router().use(create);

module.exports = user_endpoints;
