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
const port = process.env.PORT || 3000;

// Set up CORS
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

// MongoDB connection and initialization
async function main() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log("Mongoose connected successfully");
  } catch (err) {
    console.log("Error connecting to MongoDB:", err);
  }
}

// Export the app handler for Vercel (for serverless deployment)
module.exports = (req, res) => {
  if (mongoose.connection.readyState === 1) {
    app(req, res); // Handle the request if MongoDB is connected
  } else {
    res.status(500).send("Database connection failed");
  }
};

main();

// If you want to test locally, you can use app.listen, but Vercel handles the request
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log("App is listening on port", port);
  });
}
