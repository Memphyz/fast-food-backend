const express = require("express");
const { default: mongoose } = require("mongoose");
const user_endpoints = require("./routers/user/user-module");
require("dotenv").config();
const config = require("./server-config");

const app = express();
const URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@fastapi.pouco.mongodb.net/${config.db.name}?retryWrites=true&w=majority`;

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use("/user", user_endpoints);

mongoose
  .connect(URL)
  .then(() => {
    console.info("SUCESSO: Conectado ao database");
    app.listen(config.app.port);
  })
  .catch(console.error);
