import "dotenv/config";
import { connectDB } from "./config/db.js";
import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import cors from "cors";
import eventRoutes from "./routes/eventRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Logging Middleware
const myMiddleWare = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} - ${req.url}`);
  next();
};
app.use(myMiddleWare);

// Routes
app.use("/events", eventRoutes);
app.use("/users", userRoutes);

app.get("/", (_, res) => {
  res.send("Hello world");
});

// Catch 404 Errors
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Error Handling Middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Port Configuration and Server Startup
const PORT = process.env.PORT || 8000;

// Ensure database is connected before starting the server to avoid
// mongoose buffering timeouts when the app serves requests immediately.
await connectDB();

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
