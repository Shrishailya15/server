const mongoose=require("mongoose")
 const loginShcema=new mongoose.Schema({
    
    emaill:String,
    passwordd:String,
    createAt:{
        type:Date,
        default:Date.now, 
    },
   
 })
 module.exports=mongoose.model("login",loginShcema) 