import express, { Application, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config";
import apiRoutes from "./routes";

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
mongoose
  .connect(config.mongoUri!)
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => console.error("MongoDB connection error:", err));

// API Routes
app.use("/", apiRoutes);

// Health check endpoint
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Smart Content Aggregator API is running!" });
});

export default app;
