const emailValidator = require('email-validator');
const {passwordValidator} = require('../utils/password-validator');
const { userModel } = require('../models/user.model');
const {uploadToCloudinary} = require('../utils/cloud.upload');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.registerUser = async(req,res) => {
console.log(req.file);
console.log(req.body);
const email = req.body?.email;
const password = req.body?.password;
const username = req.body?.username;

let exist = await userModel.findOne({$or:[{username},{email}]})
if(exist){
      return res.status(409).json({
        message:"email or username already exists"
    })
}
if(!emailValidator.validate(email)){
    return res.status(400).json({
        message:"email is badly formatted"
    })
}
if(!passwordValidator.validate(password)){
    let error = passwordValidator.validate(password,{details:true})
    .map((v)=>v.message)
    error = error.join(', ')
     return res.status(400).json({
        message:error
    })
}
const hashed = await bcrypt.hash(password,12)
const url = await uploadToCloudinary(req.file)
let user = await userModel.create({
    username,email,password:hashed,image:url
})

const token = jwt.sign({
    role:user.role,
    id:user._id
},process.env.JWT_SECRET)

res.cookie('token',token,{httpOnly:true})
res.status(201).json({
    message:"user created successfully!"
})

}

exports.loginUser = async(req,res) => {
    try{
const email = req.body?.email;
const password = req.body?.password;
const username = req.body?.username;
const user = await userModel.findOne({
    $or:[
        {username},
        {email}
    ]
})
console.log(user)
if(!user){
    return res.status(400).json({
        message:"invalid creds"
    }) 
}
let comparePassword = await bcrypt.compare(password,user.password)
if(!comparePassword){
    return res.status(400).json({
        message:"invalid creds"
    }) 
}
const token = jwt.sign({
    role:user.role,
    id:user._id
},process.env.JWT_SECRET)

res.cookie('token',token,{httpOnly:true})
res.status(200).json({
    message:"user login successfully!"
})
    }catch(err){
        console.log(err,'server error');
        
        res.status(500).json({
            message:"internal server error"
        })
    }
}
exports.logoutUser = async(req,res) => {
    res.clearCookie('token')
    res.status(200).json({
        message:"logged out successfully!"
    })
}