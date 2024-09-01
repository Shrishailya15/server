const express =require("express")
const router= express.Router();
const login=require("../Model/login");
const signup=require("../Model/SignUp");
const { route } = require("./ApplicationRoute");


router.post("/", async (req, res) => {
    try {
        //console.log(req.body.emaill)
        // Check if the email already exists
        const existingUser = await signup.findOne({ email: req.body.emaill });
        //console.log(existingUser)
        if (existingUser) {
            const loginData = new login({
                
                emaill: req.body.emaill,
                passwordd: req.body.passwordd
            });
            const data = await loginData.save();
            return res.status(201).json({ message: "login successful", user: data });
            
        } else {
            
            return res.status(409).json({ message: "Email doesnot exists, please Register." });
        }
    } catch (error) {
        console.log(error, "Unable to post the data");
        return res.status(500).json({ error: "Internal server error" });
    }
})
module.exports=router