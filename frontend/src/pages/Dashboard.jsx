import { getActivities, createActivity, updateActivity, deleteActivity } from "../services/activity";
import "./Dashboard.css";
import { useState } from "react";
import RawData from "../components/dashboard/RawData.jsx";
import MyActivity from "../components/dashboard/MyActivity.jsx";
function Dashboard() {

  const data = {
    activity: "rest",
    description: "Accidental 2-hour nap",
    start_time: "2026-04-03T14:00:00Z",
    end_time: "2026-04-03T16:00:00Z",
    duration_minutes: 120,
    mood: { "happy": 3, "sad": 2, "angry": 1, "fearful": 1, "disgusted": 1, "surprised": 4 }
  }
  const updatedData = {
    activity: "rest",
    description: "Accidental 2-hour nap ahhhh",
    start_time: "2026-04-03T14:00:00Z",
    end_time: "2026-04-03T16:00:00Z",
    duration_minutes: 120,
    mood: { "happy": 4, "sad": 2, "angry": 1, "fearful": 1, "disgusted": 1, "surprised": 4 }
  }

  async function handleCreate(data) {
    const { activity, description, start_time, end_time, duration_minutes, mood } = data;
    const res = await createActivity(activity, description, start_time, end_time, duration_minutes, mood);
    console.log(res);
  }

  async function handleGet() {
    const res = await getActivities();
    console.log(res);
  }
  async function handleDelete(id) {
    const res = await deleteActivity(id);
    console.log(res);
  }
  async function handleUpdate(id, data) {
    const { activity, description, start_time, end_time, duration_minutes, mood } = data;
    const res = await updateActivity(id, activity, description, start_time, end_time, duration_minutes, mood);
    console.log(res);
  }

  const [currentPage, setCurrentPage] = useState("RawData")

  const pages = {
    RawData: <RawData />,
    MyActivity: <MyActivity />,
  }

  return (
    <>
      <div className="dashboard">
        <aside className="dashboard__sidebar">
          <button className={`text-sm dashboard__nav-btn ${currentPage === "RawData" ? "dashboard__nav-btn--active" : ""}`} onClick={() => setCurrentPage("RawData")}>
            Raw Data
          </button>
          <button className={`text-sm dashboard__nav-btn ${currentPage === "MyActivity" ? "dashboard__nav-btn--active" : ""}`} onClick={() => setCurrentPage("MyActivity")}>
            My New One
          </button>
          <button className={`text-sm dashboard__nav-btn ${currentPage === "lineGraph" ? "dashboard__nav-btn--active" : ""}`} onClick={() => setCurrentPage("lineGraph")}>
            Line Graph
          </button>
        </aside>

        <main className="dashboard__content">
          {pages[currentPage]}
        </main>
      </div>
    </>
  )
}

export default Dashboard;

//       <div onClick={() => handleCreate(data)}>create</div>
//       <div onClick={() => handleGet()}>get</div>
//       <div onClick={() => handleUpdate("69dc7ddf3849fc49ad73deae", updatedData)}>update</div>
// <div onClick={() => handleDelete("69dca46588d152502cc1b1dc")}>delete</div>