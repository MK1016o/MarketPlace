import express from "express";
import {
  createProduct,
  getProducts,
  addFavorite,
  removeFavorite
} from "../controllers/product-controller.js";
import { protect } from "../middleware/auth-middleware.js";
import { Product } from "../models/Product.js";
import { User } from "../models/User.js";

const router = express.Router();

// Create product
router.post("/", protect, createProduct);

// Get all products (search + pagination)
router.get("/", getProducts);

// 🔥 Get single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
});

// Favorite routes
router.post("/:id/favorite", protect, addFavorite);
router.delete("/:id/favorite", protect, removeFavorite);

// Get logged user's favorites
router.get("/favorites/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("favorites");

    res.status(200).json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
