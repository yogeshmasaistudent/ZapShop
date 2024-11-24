import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDB from "./Config/db.js";
import UserRouter from "./Routes/user.router.js";
dotenv.config();
const app = express();
import bodyParser from "body-parser";
import ProductRouter from "./Routes/product.router.js";
import AddressRouter from "./Routes/address.router.js";
import CartRouter from "./Routes/cart.router.js";

// Middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json())


// Routes
app.use("/users",UserRouter)

app.use("/products",ProductRouter)

app.use("/address",AddressRouter)

// Add To Cart 
app.use("/cart",CartRouter)




// app
const PORT = process.env.Port || 3030;
app.listen(PORT, async () => {
  try {
    await ConnectDB;
    console.log(`http://localhost:${PORT}`);
  } catch (error) {
    console.log(`Server has some error`);
  }
});
