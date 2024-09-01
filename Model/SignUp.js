const mongoose=require("mongoose")
 const SignUpShcema=new mongoose.Schema({
    fname:String,
    lname:String,
    email:String,
    password:String,
    createAt:{
        type:Date,
        default:Date.now, 
    },
   
 })
 module.exports=mongoose.model("SignUp",SignUpShcema) 