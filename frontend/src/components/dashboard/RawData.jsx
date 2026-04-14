import { useState } from "react";
import "./RawData.css";
import { deleteActivity } from "../../services/activity.js";

function ActivityRow({ data, onDelete }) {
  const {_id, activity, description, start_time, end_time, duration_minutes, mood } = data;
  const [expanded, setExpanded] = useState(false);

    const handleDelete = async () => {
      if (!confirm("Are you sure you want to delete this record?")) return;
      const res = await deleteActivity(_id);
      console.log(res);
      onDelete(_id);
    };

  return (
    <div className="rawdata-row-wrapper">
      <div className="rawdata-row">
        <div>{activity}</div>
        <div>{description}</div>
        <div>{new Date(start_time).toLocaleString("th-TH")}</div>
        <div>{new Date(end_time).toLocaleString("th-TH")}</div>
        <div>{duration_minutes} min</div>
        <div
          className="rawdata-expand-btn"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "▲" : "▼"}
        </div>
      </div>

      {expanded && (
        <div className="rawdata-detail">
          <div><span className="semibold">Activity: </span>{activity}</div>
          <div><span className="semibold">Description: </span>{description}</div>
          <div><span className="semibold">Start Time: </span>{new Date(start_time).toLocaleString("th-TH")}</div>
          <div><span className="semibold">End Time: </span>{new Date(end_time).toLocaleString("th-TH")}</div>
          <div><span className="semibold">Duration: </span>{duration_minutes} min</div>
          <div><span className="semibold">Mood:</span> {Object.entries(mood).map(([key, val]) => `${key}: ${val}`).join(", ")}</div>
          <div className="rawdata-delete bold" onClick={handleDelete}>Delete</div>
        </div>
      )}
    </div>
  );
}

function RawData({ records = [], onDelete}) {
  return (
    <div className="rawdata">
      <div className="rawdata-row rawdata-row-header regular">
        <div>Activity</div>
        <div>Description</div>
        <div>Start time</div>
        <div>End time</div>
        <div>Duration</div>
        <div>Detail</div>
      </div>
      {records.map((r) => (
        <ActivityRow key={r._id} data={r} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default RawData;