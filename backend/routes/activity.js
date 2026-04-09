import express from "express";
import { createActivity, getActivities, updateActivity, deleteActivity } from "../controllers/activity.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/me", protect, getActivities);
router.post("/", protect, createActivity);
router.put("/:id", protect, updateActivity);
router.delete("/:id", protect, deleteActivity);
export default router;
