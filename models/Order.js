const {Schema, Types} = require("mongoose");
const schema = require("../utils/global-schema");

const Order = schema('Order', {
     started: Date,
     deliveryTime: Date,
     ended: Date,
     user: {type: Schema.Types.ObjectId, ref: 'User'},
     products: [{
          id: {type: Schema.Types.ObjectId, ref: 'Product'},
          notes: String,
          addictionals: [{type: Object, ref: 'Additional'}]
     }],
     payment: {type: String, ref: 'Payment'},
     address: {
          type: Schema.Types.ObjectId, ref: 'Address'
     },
     rating: Number,
     number: Number,
     overview: String,
     created: Date,
     updated: Date,
     createdBy: String,
     updatedBy: String,
     status: {
          type: String,
          enum: ['CONFIRM_ORDER', 'START_PREPARATION', 'READY_PICKUP', 'DISPATCH', 'CANCEL_REQUEST', 'CANCELLED', 'DENY_CANCEL'],
          required: true
     },
});

module.exports = Order;