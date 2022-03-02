const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
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
if (process.env.NODE_ENV === "development") {
  const morgan = require("morgan");

  app.use(morgan("tiny"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/goals", goalsRoutes);
app.use("/api/users", usersRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("App currently in development phase!"));
}

app.use(errorHandler);

// Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
