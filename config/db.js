const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to database ${conn.connection.host}`);
    }
    catch(err){
        console.log(err);
    }
}

module.exports = connectDB