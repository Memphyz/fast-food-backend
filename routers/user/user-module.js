const { Router } = require("express");

const create = require("./create");
const findAll = require("./find-all");

const user_endpoints = Router().use(create, findAll);

module.exports = user_endpoints;
