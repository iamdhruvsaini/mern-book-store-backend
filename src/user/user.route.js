const express =require("express");
const User = require("./users.model");
const jwt=require("jsonwebtoken");
const router=express.Router();


const JWT_SECRET=process.env.JWT_SECRET_KEY

router.post("/admin",async(req,res)=>{
    const {username,password}=req.body;
    try {
        const admin=await User.findOne({username})
        if(!admin){
            return res.status(404).send({mssg:"Admin Not Found !"});
        }
        if(password!==admin.password){
            return res.status(401).send({mssg:"Invalid Credentials !"})
        }

        const token=jwt.sign({id:admin._id,username:admin.username,role:admin.role},JWT_SECRET,{expiresIn:"1h"})

        return res.status(200).json({
            message:"Authenitication Successfull",
            token:token,
            user:{
                username:admin.username,
                role:admin.role,
            }
        })
        
    } catch (error) {
        console.log("Failed to log in as admin",error);
        res.status(401).send({mssg:"Failed Login as Admin"});
        
    }
})

module.exports=router;