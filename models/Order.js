const {Schema} = require("mongoose");
const schema = require("../utils/global-schema");

const Order = schema('Order', {
     started: Date,
     deliveryTime: Date,
     ended: Date,
     user: {type: Schema.Types.ObjectId, ref: 'User'},
     products: [{
          id: {type: Schema.Types.ObjectId, ref: 'Product'},
          notes: String
     }],
     payment: {type: String, ref: 'Payment'},
     address: {
          country: String,
          street: String,
          postal: Number,
          neighborhood: String,
          number: Number,
          complement: String,
          type: {
               type: String,
               enum: ['COMMERCIAL', 'RESIDENTIAL', 'KINSHIP'],
               required: true
          }
     },
     rating: Number,
     overview: String,
     status: {
          type: String,
          enum: ['CONFIRM_ORDER', 'START_PREPARATION', 'READY_PICKUP', 'DISPATCH', 'CANCEL_REQUEST', 'CANCELLED', 'DENY_CANCEL'],
          required: true
     },
});

module.exports = Order;