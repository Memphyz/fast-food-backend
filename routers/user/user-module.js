const {Router} = require("express");

const create = require("./create");
const findAll = require("./find-all");
const login = require("./login");
const findById = require("./find-by-id");

const user_endpoints = Router().use(create, findAll, login, findById);

module.exports = user_endpoints;
