const express = require("express");
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const { errorHandler } = require("./middlewares/errorMiddleware");
const router = require("./routes/goalsRoutes");

const PORT = process.env.PORT || 5000;

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
