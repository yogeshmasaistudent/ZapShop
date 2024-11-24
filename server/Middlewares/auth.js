import jwt from "jsonwebtoken"
import UserModel from "../Models/user.model.js";

export const Authenticated = async(req,res,next)=>{
    const token = req.headers.authorization;
    if(!token){
        return res.status(200).json({msg:"Login First"})
    }
    const decode = jwt.verify(token, "Yogesh");
    const id  = decode.id;
  const user = await UserModel.findById(id);
  if(!user){
    return res.status(400).json({msg:"User does not exist"})
  }
  req.user = user;
    next()
}
