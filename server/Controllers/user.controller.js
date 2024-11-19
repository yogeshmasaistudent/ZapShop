import express from "express";
import userModel from "../Models/user.model.js";


// registation 
export const register = async(req,res)=>{
    const {name,email,password} = req.body;
    try {
        let existUser = await userModel.findOne({email});
        if(existUser){
            res.status(400).json({msg:"User is allready exist"})
        }else{
           const hashpassword = await bcrypt.hash(password,10);
           const User = await userModel({
            name:name,
            email:email,
            password:hashpassword
           })
           User.save();
           res.status(200).json({msg:"User is register successfully!"})
        }
      
    } catch (error) {
      res.status(400).json({error:error.message});
    }
}



// User Login 
const login = async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}



export default {register,login}
