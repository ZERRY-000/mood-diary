import { Activity } from "../models/Activity.js";
export const createActivity = async (req, res) => {
  try {
    const { userId, activity, description, start_time, end_time, duration_minutes, mood } =
      req.body;

    // the request user ID has been compared with the params. if they do not match, this function will reject.
    if (req.user._id.toString() !== userId) {
      return res.status(403).json({ message: "Forbidden user ID does not match." });
    }

    const newActivity = await Activity.create({
      userId,
      activity,
      description,
      start_time,
      end_time,
      duration_minutes,
      mood,
    });

    //response for dev
    res.status(201).json({ id: newActivity._id, message: "Activity has been saved." });
    // res.status(201).json({ message: "Activity has been saved." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getActivities = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // the request user ID has been compared with the params. if they do not match, this function will reject.
    if(req.user._id.toString() !== userId) {
      return res.status(403).json({ message: "Forbidden user ID does not match." });
    }

    const activities = await Activity.find({
      userId,
    });
    res.status(200).json(activities, req.user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateActivity = async (req, res) => {
  try {
    const { id } = req.params;

    const activity = await Activity.findById(id);
    if (!activity) return res.status(404).json({ message: "Activity not found." });

    // the request user ID has been compared with the params. if they do not match, this function will reject.
    if (activity.userId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Forbidden user ID does not match." });

    const updated = await Activity.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;

    // the request user ID has been compared with the params. if they do not match, this function will reject.
    if (activity.userId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Forbidden user ID does not match." });

    const deleted = await Activity.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Activity not found." });
    res.status(200).json({ message: "Activity has been deleted." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};