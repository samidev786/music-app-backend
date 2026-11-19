const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    uri:{
        type:String,
        required:true
    },
    title:{
         type:String,
        required:true
    },
    artist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    }
})

exports.musicModel = mongoose.model('music',schema)