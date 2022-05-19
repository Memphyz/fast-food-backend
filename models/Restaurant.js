const {Schema} = require("mongoose");
const schema = require("../utils/global-schema");
const Address = require("./Address");
const Product = require("./Product");
const User = require("./User");


const Restaurant = schema('Restaurant', {
     name: String,
     freight: Number,
     kitchen: String,
     address: {type: Object, ref: 'Address'},
     active: Boolean,
     open: String,
     close: String,
     register: Date,
     update: Date,
     payments: [{type: String, ref: 'Payment'}],
     owners: [{type: Schema.Types.ObjectId, ref: 'User'}],
     products: [{type: Schema.Types.ObjectId, ref: 'Product'}],
})

module.exports = Restaurant;