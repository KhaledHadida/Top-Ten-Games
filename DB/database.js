//dependency for mongoose
const mongoose = require('mongoose');
//our link to the mongoose server
const config = require('config');
const db = config.get('mongoURI');

//Connect to the mongodb 
const connectDB = async () => {
  try{
    await mongoose.connect(db);
    console.log('MongoDB Connected...');
  } catch(err){
    console.error(err.message);
    // exit process with failure
    process.exit(1);
  }
}
module.exports = connectDB;