import ProductModel from "../Models/Product.model.js";

// Add Product
export const addProduct = async (req, res) => {
  const { title, description, price, category, qty, imgSrc } = req.body;

  try {
    const product = new ProductModel({
      title,
      description,
      price,
      category,
      qty,
      imgSrc,
    });
    await product.save();
    res.status(201).json({ msg: "Product added successfully", product });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ msg: "Failed to add product" });
  }
};

// Get All Products
export const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find().sort({ createdAt: -1 });
    res.status(200).json({ msg: "Fetched all products", products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ msg: "Failed to fetch products" });
  }
};

// Get Product by ID
export const getproductById = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.status(200).json({ msg: "Fetched product successfully", product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ msg: "Failed to fetch product" });
  }
};

// Update Product by ID
export const UpdateProductById = async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Returns updated document
    );
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.status(200).json({ msg: "Product updated successfully", product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ msg: "Failed to update product" });
  }
};

// Delete Product by ID
export const deleteProductById = async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.status(200).json({ msg: "Product deleted successfully", product });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ msg: "Failed to delete product" });
  }
};
