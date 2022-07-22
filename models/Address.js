const {Types, Schema} = require("mongoose");
const schema = require("../utils/global-schema");


const Address = schema('Address', {
     postalCode: String,
     address: String,
     number: String,
     user: {type: Schema.Types.ObjectId, ref: 'User'},
     neighborhood: String,
     city: String,
     state: String,
     complement: String,
     reference: String,
     district: String,
     created: Date,
     updated: Date,
     createdBy: String,
     updatedBy: String,
});

module.exports = Address;