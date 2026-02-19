import { Product } from "../models/Product.js";
import { User } from "../models/User.js";

// Create Product
export const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

// Get Products with search + pagination
export const getProducts = async (req, res) => {
  const { search = "", page = 1, limit = 5 } = req.query;

  const query = {
    title: { $regex: search, $options: "i" }
  };

  const products = await Product.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await Product.countDocuments(query);

  res.json({
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
    products
  });
};

// Add Favorite
export const addFavorite = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user.favorites.includes(req.params.id)) {
    user.favorites.push(req.params.id);
    await user.save();
  }
  res.json({ message: "Added to favorites" });
};

// Remove Favorite
export const removeFavorite = async (req, res) => {
  const user = await User.findById(req.user.id);
  user.favorites = user.favorites.filter(
    (fav) => fav.toString() !== req.params.id
  );
  await user.save();
  res.json({ message: "Removed from favorites" });
};
