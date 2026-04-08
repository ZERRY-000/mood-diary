import express from "express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.js";
import activityRoutes from "./routes/activity.js"
import "dotenv/config";

connectDB();

const app = express();
app.use(express.json());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/activities", activityRoutes);

app.listen(3000, () =>
  console.log("Server running on port 3000\nhttp://localhost:3000/"),
);
