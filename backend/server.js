const express = require("express");
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const colors = require("colors");
const { errorHandler } = require("./middlewares/errorMiddleware");
const connectDB = require("./config/db");
const router = require("./routes/goalsRoutes");

const PORT = process.env.PORT || 5000;

// MongoDB connection
connectDB();

const app = express();

// MiddleWares
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/goals", router);
app.use(errorHandler);

// Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
