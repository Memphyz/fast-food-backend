const schema = require("../utils/global-schema");

const Additional = schema('Additionals', {
     unitPrice: Number,
     total: Number,
     quantity: Number,
     description: String,
     name: String,
     notes: String
});

module.exports = Additional;