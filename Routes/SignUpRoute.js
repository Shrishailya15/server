const express =require("express")
const router= express.Router();
const signup=require("../Model/SignUp");


router.post("/", async (req, res) => {
    try {
        // Check if the email already exists
        const existingUser = await signup.findOne({ email: req.body.email });
        if (existingUser) {
            // Email already exists, send a message to the client
            return res.status(409).json({ message: "Email already exists, please log in." });
        } else {
            // Email does not exist, create a new user
            const signupData = new signup({
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                password: req.body.password
            });
            const data = await signupData.save();
            return res.status(201).json({ message: "Sign up successful", user: data });
        }
    } catch (error) {
        console.log(error, "Unable to post the data");
        return res.status(500).json({ error: "Internal server error" });
    }
})

router.get("/",async (req,res)=>{
    try {
        const data=await signup.find();
        res.json(data) .status(200)
    } catch (error) {
        console.log(error);
        res.status(404).json({error:"Internal server error "})
    }
})


router.get("/:id", async (req,res)=>{
    const {id}=req.params;
    try {
        const data=await signup.findById(id);
        if (!data) {

             res.status(404).json({error:"Internship is not found "})
        }
        res.json(data) .status(200)
    } catch (error) {
        console.log(err);
        res.status(404).json({error:"Internal server error "})
    }
})
module.exports=router