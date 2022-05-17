const {Schema} = require("mongoose");
const schema = require("../utils/global-schema");
const Address = require("./Address");
const Product = require("./Product");
const User = require("./User");


const Restaurant = schema('Restaurant', {
     name: String,
     freight: Number,
     kitchen: String,
     address: Address,
     active: Boolean,
     open: Boolean,
     register: Date,
     update: Date,
     payments: [],
     owners: [{type: Schema.Types.ObjectId, ref: 'User'}],
     products: [{type: Schema.Types.ObjectId, ref: 'Product'}],
})

module.exports = Restaurant;