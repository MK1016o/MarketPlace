import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth-routes.js";
import productRoutes from "./routes/product-routes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Micro Marketplace API Running");
});

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);
