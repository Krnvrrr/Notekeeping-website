const express = require("express");
const router = express.Router();
const User = require("../modules/User.js");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser=require('../middleware/fetchUser');
const { findById } = require("../modules/User.js");
// Creating a new user 
router.post(
  "/createuser",
  [
    body("name", "enter a valid name").isLength({ min: 3 }),
    body("email", "Unvalid email").isEmail(),
    body("password", "Enter a strong password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    var user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ error: "user with same email already exist" });
    }
    jwt_secret='not-so_cool';
    const salt =await bcrypt.genSalt(10);
    const secure= await bcrypt.hash(req.body.password,salt);
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secure,
    });  
    let name=req.body.name
    const data={
      user:{
        id:user.id,
      }
    }
    const authtoken=jwt.sign(data,jwt_secret);let success= true;
    res.json({success,authtoken,name});
  }
);

// Logging In
router.post('/login',[
  body("email", "Unvalid email").isEmail(),
  body("password", "Enter a password").exists(),
], async (req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  const {email,password}=req.body;
  try {
    let user=await User.findOne({email})
    if(!user){
      res.status(400).json({error:'plese enter valid login credential'});
    }
    const passcompare= bcrypt.compare(password,user.password);
    if(!passcompare){
      res.status(400).json({error:'please enter valid login credential'});
    }
    let name= user.name;
    console.log(name)
    const data={
      user:{
        id:user.id,
      }
    }
    jwt_secret='not-so_cool';
    const authtoken=jwt.sign(data,jwt_secret);let success= true;
    res.json({success,authtoken,name});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
})
// fatching data of existing user
router.post('/getuser',fetchUser,async (req,res)=>{
  try {
    const userID=req.user.id;
    let user= await User.findById(userID).select('-password');
    res.json(user)
  } catch (error) {
    console.log(error);
    res.status(500).send("internal server error")
  }
})
module.exports = router;
