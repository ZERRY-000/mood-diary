import { getActivities, createActivity, updateActivity, deleteActivity } from "../services/activity";
import "./Dashboard.css";
import { useEffect, useState } from "react";
import RawData from "../components/dashboard/RawData.jsx";
import MyActivity from "../components/dashboard/MyActivity.jsx";
import LineGraph from "../components/dashboard/LineGraph.jsx";
function Dashboard() {

  const [rawData, setRawData] = useState([]);

  const [currentPage, setCurrentPage] = useState("RawData")

  const handleDelete = (id) => {
    setRawData((prev) => prev.filter((r) => r._id !== id));
  };
  
  const fetchData = async () => {
    const res = await getActivities();
    const sorted = [...res].sort(
      (a, b) => new Date(b.start_time) - new Date(a.start_time)
    );
    setRawData(sorted);
  };

  const pages = {
    RawData: <RawData records={rawData} onDelete={handleDelete} />,
    MyActivity: <MyActivity onActivityCreated={fetchData}  />,
    LineGraph: <LineGraph records={rawData} />
  }


  useEffect(() => {
    fetchData();
  }, []);


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
          <button className={`text-sm dashboard__nav-btn ${currentPage === "LineGraph" ? "dashboard__nav-btn--active" : ""}`} onClick={() => setCurrentPage("LineGraph")}>
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