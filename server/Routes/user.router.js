import express from "express";
const UserRouter = express.Router();
import {register} from "../Controllers/user.controller.js"

UserRouter.post("/register",register)



export default UserRouter;