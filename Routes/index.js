const express =require("express")
const router= express.Router();
const ApplicationRoute=require("./ApplicationRoute")
const intern=require("./internshipRout")
const job=require("./jobRoute")
const admin=require("./admin")
const signup=require("./SignUpRoute")
const login=require("./loginRoute")
const resume=require("./ResumeRoute")
const razorpay = require("./RasorpayRoute");



router.get("/",(req,res)=>{
    res.send("the is backend")
})
router.use('/application',ApplicationRoute);
router.use('/internship',intern);
router.use('/job',job);
router.use('/admin',admin);
router.use('/signup',signup);
router.use('/login',login);
router.use('/resume',resume);
router.use('/rasorpay',razorpay);





module.exports=router;