const {Schema} = require("mongoose");
const Order = require("../enums/Order");
const schema = require("../utils/global-schema");
const Additional = require("./Additional");


const Product = schema('Product', {
     name: String,
     description: String,
     price: Number,
     active: Boolean,
     image: String,
     created: Date,
     updated: Date,
     createdBy: String,
     updatedBy: String,
     restaurant: {type: Schema.Types.ObjectId, ref: 'Restaurant'},
     additionals: [{type: Object, ref: 'Additional'}],
})
module.exports = Product;