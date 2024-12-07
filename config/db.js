const mongoose = require('mongoose');
require('dotenv').config()


const connectDb = async()=>{
    try{
        await mongoose.connect('mongodb+srv://mdrkkapadia:mdrkkapadia@mukund.qwmwlh0.mongodb.net/meditrack?retryWrites=true&w=majority&appName=mukund');
        console.log('MongoDB Connected...');
    }
    catch(error){
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
}

module.exports = connectDb;