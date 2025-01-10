const express = require('express')
const router = express.Router()
const Order = require('../models/order')




router.get(`/`, async (req, res) =>{
    const orderList = await Order.find();

    if(!orderList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(orderList);
})


router.post('/',  async (req,res)=>{
 
    let data = req.body.order_data

    await data.splice(0,0,{Order_date: req.body.order_date})

    let eId = await Order.findOne({'email': req.body.email})

    console.log(eId)

    if(eId === null){

        let order = new Order({
        email: req.body.email,
        order_data: [data]  
    })

    order = await order.save();

    if(!order)
    return res.status(400).send('the order cannot be created!')

    res.send(order);
    }
   
   
})


router.post(`/myOrderData`, async (req, res) =>{
   // const orderList = await Order.find();

   let eId = await Order.findOne({ 'email': req.body.email })

 // let eId = await Order.findOne({ 'email': req.params.email })


    if(!eId) {
        res.status(500).json({success: false})
        return
    } 
    res.status(200).send(eId);
    return
})


module.exports = router