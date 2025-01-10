const mongoose = require('mongoose')
const {Schema} = mongoose

const Order = mongoose.model(
  'Order',
  new Schema({
    email: {type: String, required: true, unique:true},
    order_data: {type: Array, required: true}
    
  }),
)

module.exports = Order