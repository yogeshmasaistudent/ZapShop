import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const ConnectDB = mongoose.connect(process.env.Mongo_URL);

export default ConnectDB;
