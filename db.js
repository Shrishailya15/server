const mongoose=require("mongoose")
require('dotenv').config()
DATABASE=process.env.DATABASEURL
module.exports.connect=()=>{
    mongoose.connect(DATABASE,console.log("Database is connected"))
}