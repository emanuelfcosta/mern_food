const express = require('express')
const router = express.Router()
const User = require('../models/user')

const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")

const jwtSecret = "Mysecret"


router.get(`/`, async (req, res) =>{
    const userList = await User.find();

    if(!userList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(userList);
})

router.post('/',  async (req,res)=>{

    const salt = await bcrypt.genSalt(10);
    let setPassword = await bcrypt.hash(req.body.password, salt);



    let user = new User({
        name: req.body.name,
        password: setPassword,
        email: req.body.email,
    })
    user = await user.save();

    if(!user)
    return res.status(400).send('the user cannot be created!')

    

    res.send(user);
})

router.post('/loginuser',  async (req,res)=>{

    let email = req.body.email;

    try{

   let userData = await User.findOne({email});

   if(!userData) {
    res.status(500).json({message: 'Try logging with correct credentials'})

  } 
   const pwdCompare = await bcrypt.compare(req.body.password,userData.password)

  
   if(!pwdCompare){
    res.status(500).json({message: 'Try logging with correct credentials'})
   }

   const data = {
        user:{
            id:userData.id       
        }
   }
   const authToken = jwt.sign(data,jwtSecret);
   res.status(200).send({userData,authToken});
  } catch(error){
    console.log(error)
     res.status(500).json({message: 'Login error'})
  }


})


module.exports = router