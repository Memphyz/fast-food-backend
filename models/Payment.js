const schema = require("../utils/global-schema");


const Payment = schema('Payment', {
     type: String,
     enum: ['CASH', 'CREDIT_CARD', 'DEBIT_CARD', 'CHECK', 'PIX'],
     default: 'CASH'
});

module.exports = Payment;

