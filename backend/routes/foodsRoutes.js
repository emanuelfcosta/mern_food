const express = require('express')
const router = express.Router()
const Food = require('../models/food')




router.get(`/`, async (req, res) =>{
    const foodList = await Food.find();

    if(!foodList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(foodList);
})

router.post('/',  async (req,res)=>{

   
    let food = new Food({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image  
    })
    food = await food.save();

    if(!food)
    return res.status(400).send('the food cannot be created!')

    

    res.send(food);
})

router.delete('/:id', (req, res)=>{
    Food.findByIdAndDelete(req.params.id).then(food =>{
        if(food) {
            return res.status(200).json({success: true, message: 'the food is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "food not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})




module.exports = router