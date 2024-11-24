import express from "express";
import {
  addProduct,
  getproductById,
  getProducts,
  UpdateProductById,
  deleteProductById,
} from "../Controllers/product.controller.js";
import { Authenticated } from "../Middlewares/auth.js";

const ProductRouter = express.Router();

// Routes
ProductRouter.post("/add", addProduct); // Add product
ProductRouter.get("/all",  getProducts); // Get all products
ProductRouter.get("/:id", getproductById); // Get product by ID
ProductRouter.patch("/:id", UpdateProductById); // Update product by ID
ProductRouter.delete("/:id", deleteProductById); // Delete product by ID

export default ProductRouter;
