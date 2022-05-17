const schema = require("../utils/global-schema");

const Additionals = schema('Additionals', {
     unitPrice: Number,
     total: Number,
     quantity: Number,
     notes: String
});

module.exports = Additionals;