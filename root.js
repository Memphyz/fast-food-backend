const express = require("express");
const {default: mongoose} = require("mongoose");
const user_endpoints = require("./routers/user/user-module");
const restaurants_endpoints = require("./routers/restaurant/restaurant-module");
const products_endpoints = require("./routers/product/product-module");
const orders_endpoints = require("./routers/order/order-module");
const cors = require("cors");
require("dotenv").config();
const config = require("./server-config");

const app = express();
const API_VERSION_URL = '/api/v1'
const URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@fastapi.pouco.mongodb.net/${config.db.name}?retryWrites=true&w=majority`;

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.setMaxListeners(10);
app.use(express.json());
app.use(cors());

app.use(`${API_VERSION_URL}/product`, products_endpoints);
app.use(`${API_VERSION_URL}/user`, user_endpoints);
app.use(`${API_VERSION_URL}/restaurant`, restaurants_endpoints);
app.use(`${API_VERSION_URL}/order`, orders_endpoints);

mongoose
  .connect(URL)
  .then(() => {
    console.info("SUCESSO: Conectado ao database");
    app.listen(config.app.port);
  })
  .catch(console.error);
