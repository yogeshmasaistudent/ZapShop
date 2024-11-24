import express from "express";
const UserRouter = express.Router();
import {register,login, user} from "../Controllers/user.controller.js"

UserRouter.post("/register",register)
UserRouter.post("/login",login)
UserRouter.get("/all",user)



export default UserRouter;