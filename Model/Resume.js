const mongoose = require('mongoose');
const resumeSchema = new mongoose.Schema({
    name: String,
    qualification: String,
    experience: String,
    details: String,
    photo: String,
    createAt:{
        type:Date,
        default:Date.now,
    },
    
});
module.exports=mongoose.model('Resume', resumeSchema);
