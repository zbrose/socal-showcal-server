require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Logging Middleware
const myMiddleWare = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} - ${req.url}`);
  next();
};
app.use(myMiddleWare);

// Routes
app.use("/events", require("./controllers/api/events"));
app.use("/users", require("./controllers/api/users"));

app.get("/", (req, res) => {
  res.send("Hello world");
});

// Catch 404 Errors
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Port Configuration and Server Startup
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful Shutdown
process.on("SIGINT", () => {
  console.log("Shutting down gracefully...");
  process.exit();
});
process.on("SIGTERM", () => {
  console.log("Shutting down gracefully...");
  process.exit();
});
