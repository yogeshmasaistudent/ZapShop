import { CartModel } from "../Models/Cart.model.js";

// Add to Cart
export const addToCart = async (req, res) => {
  const { productId, title, price, qty, imgSrc } = req.body;
  const userId = req.user;

  try {
    let cart = await CartModel.findOne({ userId });

    // If no cart exists, create a new one
    if (!cart) {
      cart = new CartModel({ userId, items: [] });
    }

    // Check if the product already exists in the cart
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      // If product exists, update quantity and price
      cart.items[itemIndex].qty += qty;
      cart.items[itemIndex].price += price * qty;
    } else {
      // Otherwise, add a new product to the cart
      cart.items.push({ productId, title, price, qty, imgSrc });
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart successfully", cart });
  } catch (error) {
    res.status(500).json({ message: "Failed to add item to cart", error });
  }
};

// Get User Cart
export const userCart = async (req, res) => {
  const userId = req.user;

  try {
    const cart = await CartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "User cart fetched successfully", cart });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user cart", error });
  }
};

// Remove Product from Cart
export const removeProductFromCart = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user;

  try {
    const cart = await CartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Filter out the product to remove it from the cart
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to remove product from cart", error });
  }
};

// Clear Cart
export const clearCart = async (req, res) => {
  const userId = req.user;

  try {
    const cart = await CartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = []; // Clear all items from the cart
    await cart.save();

    res.status(200).json({ message: "Cart cleared successfully", cart });
  } catch (error) {
    res.status(500).json({ message: "Failed to clear cart", error });
  }
};

// Decrease Product Quantity
export const decreaseProductQty = async (req, res) => {
  const { productId, qty } = req.body;
  const userId = req.user;

  try {
    const cart = await CartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      const item = cart.items[itemIndex];
      const pricePerUnit = item.price / item.qty;

      if (item.qty > qty) {
        // Decrease quantity and update price
        item.qty -= qty;
        item.price -= pricePerUnit * qty;
      } else {
        // Remove the product if quantity is zero or less
        cart.items.splice(itemIndex, 1);
      }

      await cart.save();
      res.status(200).json({ message: "Product quantity decreased", cart });
    } else {
      res.status(400).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to decrease product quantity", error });
  }
};
