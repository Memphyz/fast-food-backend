const { default: mongoose, Schema } = require("mongoose");

const User = mongoose.model(
  "User",
  new Schema({
    name: String,
    surname: String,
    password: String,
    email: String,
    born: Date,
    cpf: String,
  })
);

module.exports = User;
