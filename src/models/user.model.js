const mongoose = require('mongoose');

const schema = mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user','artist'],
        default:"user"
    },
    image:{
        type:String,
        required:true
    },
})

exports.userModel = mongoose.model('user',schema)