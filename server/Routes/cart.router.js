import express, { Router } from "express";
import { addToCart, clearCart, decreaseProductQty, removeProductFromCart, userCart } from "../Controllers/cart.controller.js";
import { Authenticated } from "../Middlewares/auth.js";

const CartRouter = express.Router();

CartRouter.post("/add" ,Authenticated,addToCart)
CartRouter.get("/",Authenticated,userCart)
CartRouter.delete("/remove",Authenticated,removeProductFromCart);
CartRouter.delete("/clearcart",Authenticated,clearCart);
CartRouter.post("/decrese",Authenticated,decreaseProductQty);
export default CartRouter;