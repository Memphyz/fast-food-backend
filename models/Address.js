const schema = require("../utils/global-schema");


const Address = schema('Address', {
     postalCode: String,
     street: String,
     number: String,
     neighborhood: String,
     city: String,
     state: String,
     complement: String,
     reference: String,
     district: String,
});

module.exports = Address;