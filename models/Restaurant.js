const {Schema} = require("mongoose");
const schema = require("../utils/global-schema");


const Restaurant = schema('Restaurant', {
     name: String,
     freight: Number,
     kitchen: String,
     address: {type: Schema.Types.ObjectId, ref: 'Address'},
     active: Boolean,
     photo: String,
     open: String,
     rate: Number,
     created: Date,
     createdBy: String,
     updated: Date,
     updatedBy: String,
     close: String,
     register: Date,
     update: Date,
     payments: [{type: String, ref: 'Payment'}],
     owners: [{type: Schema.Types.ObjectId, ref: 'User'}],
     products: [{type: Schema.Types.ObjectId, ref: 'Product'}],
})

module.exports = Restaurant;