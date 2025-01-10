const mongoose = require('mongoose')

async function main(){
  await mongoose.connect('mongodb://localhost:27017/mern_food')
  console.log('connected to mongoose')
}

main().catch((err) => console.log(err))

module.exports = mongoose