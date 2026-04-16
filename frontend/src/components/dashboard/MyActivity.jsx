import { useState, useEffect } from "react";
import "./MyActivity.css";
import { getMe } from "../../services/auth.js";
import useAuth from "../../hooks/useAuth.jsx";
import { createActivity } from "../../services/activity.js";

function MyActivity({ onActivityCreated }) {

  const { user, setUser } = useAuth();
  const [activity, setActivity] = useState("")
  const [description, setDescription] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [duration, setDuration] = useState("")
  const [mood, setMood] = useState({ happy: 0, sad: 0, angry: 0, fearful: 0, disgusted: 0, surprised: 0 })
  const activities = ["work", "exercise", "learn", "hobby", "games", "music", "social", "rest", "eating", "other"]
  const mood_tags = ["happy", "sad", "angry", "fearful", "disgusted", "surprised"]
  const mood_score = [1, 2, 3, 4, 5]
  const mood_desc = [
    "How good or positive did this activity make you feel?",
    "Did this activity leave you feeling down, empty, or disappointed?",
    "Did anything about this activity frustrate or irritate you?",
    "Did this activity make you feel anxious, stressed, or uncertain?",
    "Did anything feel uncomfortable, wrong, or off-putting?",
    "Did anything catch you off guard — good or bad?",
  ]

  useEffect(() => {
    async function fetchUser() {
      const res = await getMe();
      setUser(res.data);
    }
    fetchUser();
  }, []);

  function handleLog() {
    const data = { userId: user._id, activity, description, start_time: startTime, end_time: endTime, duration_minutes: Number(duration), mood };
    console.log(data);
  }

  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState("")

  function validate() {
    const newErrors = {}
    if (!activity) newErrors.activity = "Please select an activity"
    if (!description) newErrors.description = "Please enter a description"
    if (!startTime) newErrors.startTime = "Please select a start time"
    if (!endTime) newErrors.endTime = "Please select an end time"
    if (!duration) newErrors.duration = "Please enter duration"
    for (const key in mood) {
      if (mood[key] === 0) {
        newErrors.mood = "Please rate all moods"
        break
      }
    }
    return newErrors
  }

  async function handleCreate() {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setErrors({})
    const res = await createActivity(activity, description, startTime, endTime, Number(duration), mood);
    console.log(res)
    if (res.success) {
      setSuccess("Activity have been saved.")
      setActivity("")
      setDescription("")
      setStartTime("")
      setEndTime("")
      setDuration("")
      setMood({ happy: 0, sad: 0, angry: 0, fearful: 0, disgusted: 0, surprised: 0 })
      onActivityCreated?.()
    }
  }

  return (
    <div className="my-activity">
      <h2 className="light">What did {user?.username || "you"} do today? </h2>
      <div className="my-activity__tags">
        {activities.map((item) => (
          <div
            key={item}
            className={`my-activity__tags__choice ${activity === item ? "my-activity__tags__choice--active" : ""}`}
            onClick={() => setActivity(item)}
          >
            {item}
          </div>
        ))}
      </div>

      <textarea
        className="my-activity__description"
        name="description"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
      />

      <div className="my-activity__dates">
        <div className="my-activity__date-group">
          <h3 className="thin">Start</h3>
          <input className="my-activity__date" name="start_time" type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </div>
        <div className="my-activity__date-group">
          <h3 className="thin">End</h3>
          <input className="my-activity__date" name="end_time" type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </div>
      </div>

      <div>
        <h3 className="thin">Duration (minutes)</h3>
        <input className="my-activity__duration" name="duration_minutes" type="number" placeholder="Duration (min)" onChange={(e) => setDuration(e.target.value)} />
      </div>

      <div className="my-activity__moods">
        {mood_tags.map((tag, index) => (
          <div key={tag}>
            <h4 className="regular">{tag}</h4>
            <p className="light">{mood_desc[index]}</p>
            <div className="my-activity__mood">
              {mood_score.map((score) => (
                <div
                  key={score}
                  className={`my-activity__mood__choices ${mood[tag] === score ? "my-activity__mood__choice--active" : ""}`}
                  onClick={() => setMood({ ...mood, [tag]: score })}
                >
                  {score}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div>
        {errors.activity && <p className="text-error regular">{errors.activity}</p>}
        {errors.description && <p className="text-error regular">{errors.description}</p>}
        {errors.duration && <p className="text-error regular">{errors.duration}</p>}
        {errors.startTime && <p className="text-error regular">{errors.startTime}</p>}
        {errors.endTime && <p className="text-error regular">{errors.endTime}</p>}
        {errors.mood && <p className="text-error regular">{errors.mood}</p>}
        {success && <p className="text-success regular">{success}</p>}
      </div>
      <div className="my-activity__submit-btn light" onClick={() => handleCreate()}>Put This activity in my Journey</div>
      {/* <div onClick={() => handleLog()}>log</div> */}
    </div>
  );
}

export default MyActivity;