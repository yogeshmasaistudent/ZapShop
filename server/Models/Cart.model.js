import mongoose from "mongoose";

// cart List Schema
const CartListSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true },
  imgSrc: { type: String, required: true },
});

const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [CartListSchema],
});

export const CartModel = mongoose.model("Cart", CartSchema);
