import mongoose, { Schema } from "mongoose";
const ActivitySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    activity: {
      type: String,
      enum: [
        "work", // work, study, assignments, meetings
        "exercise", // gym, running, sports, yoga
        "learn", // online courses, tutorials, self-study
        "hobby", // drawing, reading, cooking, crafts
        "games", // video games, board games
        "music", // listening to music, playing instruments
        "social", // hanging out, parties, calls with friends/family
        "rest", // sleeping, napping, watching series, chilling
        "eating", // meals, snacks, cafes
        "other", // anything that doesn't fit above
      ],
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    start_time: {
      type: Date,
      required: true,
    },
    end_time: {
      type: Date,
      required: true,
    },
    duration_minutes: {
      type: Number,
      required: true,
    },
    // based on Paul Ekman's 6 basic emotions
    mood: {
      happy: { type: Number, min: 1, max: 5, default: 1 }, // feeling joyful, content, or satisfied
      sad: { type: Number, min: 1, max: 5, default: 1 }, // feeling down, lonely, or disappointed
      angry: { type: Number, min: 1, max: 5, default: 1 }, // feeling frustrated, irritated, or furious
      fearful: { type: Number, min: 1, max: 5, default: 1 }, // feeling anxious, worried, or stressed
      disgusted: { type: Number, min: 1, max: 5, default: 1 }, // feeling annoyed, uncomfortable, or repulsed
      surprised: { type: Number, min: 1, max: 5, default: 1 }, // feeling excited, shocked, or caught off guard
    },
  },
  { timestamps: true },
);

ActivitySchema.pre("save", function (next) {
  if (this.end_time <= this.start_time) {
    return new Error("end_time must be after start_time");
  }
});

export const Activity = mongoose.model("Activity", ActivitySchema);
