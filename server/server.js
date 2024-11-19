import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDB from "./Config/db.js";
import UserRouter from "./Routes/user.router.js";
dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());



// Routes

app.use("/users",UserRouter)


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
