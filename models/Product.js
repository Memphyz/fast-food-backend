const {Schema} = require("mongoose");
const Order = require("../enums/Order");
const schema = require("../utils/global-schema");
const Additionals = require("./Additional");
const User = require("./User");


const Product = schema('Product', {
     name: String,
     description: String,
     price: Number,
     status: [Order],
     active: Boolean,
     payment: [{type: String, ref: 'Payment'}],
     restaurant: {type: Schema.Types.ObjectId, ref: 'Restaurant'},
     client: {type: Schema.Types.ObjectId, ref: 'User'},
     additionals: [Additionals]
})
module.exports = Product;