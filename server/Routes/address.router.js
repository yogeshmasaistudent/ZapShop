import express from "express";
import { addAddress } from "../Controllers/address.controller.js";
import { Authenticated } from "../Middlewares/auth.js";

const AddressRouter = express.Router();



// Add Router 
AddressRouter.post("/add",Authenticated,addAddress);


export default AddressRouter;