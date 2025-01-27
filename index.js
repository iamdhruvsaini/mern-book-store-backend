const express = require("express");
require('dotenv').config();
const cors = require("cors");
const mongoose = require("mongoose");
const bookRoutes = require("./src/books/book.route");
const orderRoutes = require("./src/orders/order.route");
const userRoutes = require("./src/user/user.route");
const adminRoutes = require("./src/stats/admin.stats");
const path = require('path');

const app = express();

// CORS setup
app.use(cors({
  origin: ["http://localhost:5173", "https://mern-book-store-frontend-eight.vercel.app"],
  credentials: true,
}));

// Middleware for JSON parsing
app.use(express.json());

// Serve static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'src', 'books', 'uploads')));

// API Routes
app.use("/api/books/", bookRoutes);
app.use("/api/orders/", orderRoutes);
app.use("/api/auth/", userRoutes);
app.use("/api/admin/", adminRoutes);

// Default route to check server status
app.use("/", (req, res) => {
  res.send("Books Store Server is Running!");
});

// MongoDB connection
async function main() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log("Mongoose connected successfully");
  } catch (err) {
    console.log("Error connecting to MongoDB:", err.message);
  }
}

// Vercel export for serverless function
module.exports = async (req, res) => {
  await main();  // Ensure MongoDB connection before handling the request
  app(req, res);  // Handle the request using Express
};
