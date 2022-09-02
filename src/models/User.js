const {Schema} = require("mongoose");
const schema = require("../utils/global-schema");

const User = schema("User", {
  name: String,
  surname: String,
  password: String,
  email: String,
  born: Date,
  cpf: String,
  history: [{type: Schema.Types.ObjectId, ref: 'Order'}]
}, 'cpf');

module.exports = User;
