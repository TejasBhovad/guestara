import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import errorHandler from "./src/middleware/errorHandler.js";
import categoryRoutes from "./src/routes/categoryRoutes.js";
import subcategoryRoutes from "./src/routes/subcategoryRoutes.js";
import itemRoutes from "./src/routes/itemRoutes.js";
const app = express();
const port = process.env.PORT || 3000;

// Welcome route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Menu Management API",
    timestamp: "2025-01-25 14:00:22",
    author: "TejasBhovad",
  });
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subcategoryRoutes);
app.use("/api/items", itemRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`
🚀 Server running on http://localhost:${port}
👤 Started by: TejasBhovad
⏰ Start Time: 2025-01-25 14:00:22
  `);
});
