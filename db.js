const mongoose=require("mongoose")
//require('dotenv').config()
//DATABASE=process.env.DATABASEURL
const url='mongodb+srv://Shrishailya15:LQ3s4TtWUMSIXmbS@cluster0.qhlcqqy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
module.exports.connect=()=>{
    mongoose.connect(url,console.log("Database is connected"))
}