import express from "express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.js";
import activityRoutes from "./routes/activity.js"
import "dotenv/config";

connectDB();

const app = express();
app.use(express.json());

import cookieParser from "cookie-parser";
app.use(cookieParser());

import cors from "cors";
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:8501"],
    credentials: true,
  }),
);


app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/activities", activityRoutes);

app.listen(3000, () =>
  console.log("Server running on port 3000\nhttp://localhost:3000/"),
);
