const express = require("express");
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const colors = require("colors");
const { errorHandler } = require("./middlewares/errorMiddleware");
const connectDB = require("./config/db");
const goalsRoutes = require("./routes/goalsRoutes");
const usersRoutes = require("./routes/usersRoutes");

const PORT = process.env.PORT || 5000;

// MongoDB connection
connectDB();

const app = express();

// MiddleWares
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/goals", goalsRoutes);
app.use("/api/users", usersRoutes);
app.use(errorHandler);

// Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
