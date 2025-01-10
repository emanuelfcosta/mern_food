const mongoose = require('mongoose')
const {Schema} = mongoose

const Food = mongoose.model(
  'Food',
  new Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    price: {type: Number, required: true},
    date: {type: Date, default: Date.now},
   

  }),
)

module.exports = Food