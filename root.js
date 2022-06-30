const express = require("express");
const {default: mongoose} = require("mongoose");
const user_endpoints = require("./routers/user/user-module");
const restaurants_endpoints = require("./routers/restaurant/restaurant-module");
const products_endpoints = require("./routers/product/product-module");
const cors = require("cors");
require("dotenv").config();
const config = require("./server-config");

const app = express();
const URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@fastapi.pouco.mongodb.net/${config.db.name}?retryWrites=true&w=majority`;

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.setMaxListeners(10)
app.use(express.json());
app.use(cors());

app.use('/api/v1/product', products_endpoints);
app.use("/api/v1/user", user_endpoints);
app.use('/api/v1/restaurant', restaurants_endpoints);

mongoose
  .connect(URL)
  .then(() => {
    console.info("SUCESSO: Conectado ao database");
    app.listen(config.app.port);
  })
  .catch(console.error);
