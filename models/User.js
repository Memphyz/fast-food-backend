const schema = require("../utils/global-schema");

const User = schema("User", {
  name: String,
  surname: String,
  password: String,
  email: String,
  born: Date,
  cpf: String,
}, 'cpf');

module.exports = User;
