const schema = require("../utils/global-schema");


const Payment = schema({
     type: String,
     enum: ['CASH', 'CREDIT_CARD', 'DEBIT_CARD', 'CHECK'],
     default: 'CASH'
});

module.exports = Payment;

