const mongoose = require('mongoose');

exports.connectDB = async() => {
    try{
    mongoose.connect(process.env.MONGO_URI);
    console.log('database connected!');
    }catch(err){
    console.log('database connection error: ',err)
    }
}