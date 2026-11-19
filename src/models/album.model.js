const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    artist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    musicIds:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"music",
        required:true
        }
    ]
})

exports.albumModel = mongoose.model('album',schema)