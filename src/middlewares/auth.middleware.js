const jwt = require('jsonwebtoken');
const { userModel } = require('../models/user.model');
exports.authMiddleware = async(req,res,next) => {
const token = req.cookies?.token
if(!token){
    return res.status(403).json({
        message:"unauthorize access"
    })
}
let {id} = jwt.verify(token,process.env.JWT_SECRET);
if(!id){
    console.log('reached');
     return res.status(403).json({
        message:"invalid token"
    })
}
let user = await userModel.findOne({_id:id});
if(!user){
     return res.status(404).json({
        message:"user not found"
    })
}
req.user = user;
next();
}