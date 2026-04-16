import { useEffect, useState } from "react";
import Plotly from 'plotly.js-dist-min';
import "./LineGraph.css";

const MOOD_COLORS = {
  happy: "#facc15",
  sad: "#60a5fa",
  angry: "#f87171",
  fearful: "#c084fc",
  disgusted: "#4ade80",
  surprised: "#fb923c",
};
const MOODS = ["happy", "sad", "angry", "fearful", "disgusted", "surprised"];
const toTH = (dateStr) => new Date(new Date(dateStr).getTime() + 7 * 60 * 60 * 1000).toISOString();

function LineGraph({ records = [] }) {
  const activities_list = ["work", "exercise", "learn", "hobby", "games", "music", "social", "rest", "eating", "other"];
  const [activities, setActivities] = useState(["work"]);

  const toggleActivity = (item) => {
    setActivities((prev) =>
      prev.includes(item)
        ? prev.filter((a) => a !== item)
        : [...prev, item]
    );
  };

  const filtered = records.filter((r) => activities.includes(r.activity));

  const traces = MOODS.map((mood) => ({
    type: "scatter",
    mode: "lines+markers",
    name: mood,
    line: { color: MOOD_COLORS[mood] },
    x: filtered.flatMap((r) => [toTH(r.start_time), toTH(r.end_time), null]),
    y: filtered.flatMap((r) => [r.mood[mood], r.mood[mood], null]),
  }));

  useEffect(() => {
    Plotly.newPlot("graph-1", traces, {
      xaxis: {
        title: "Time",
        type: "date",
        tickformat: "%d/%m/%Y %H:%M",
        tickangle: -45,
        nticks: 16,
      },
      yaxis: { title: "Score" },
      margin: { b: 100 },
      width: window.innerWidth * 0.8,
    }, { responsive: true });
  }, [records, activities]);

  const sortedFiltered = [...filtered].sort(
    (a, b) => new Date(a.start_time) - new Date(b.start_time)
  );

  const traces2 = MOODS.map((mood) => ({
    type: "scatter",
    mode: "lines+markers",
    name: mood,
    line: { color: MOOD_COLORS[mood] },
    marker: { color: MOOD_COLORS[mood], size: 8 },
    x: sortedFiltered.flatMap((r) => [
      `${new Date(toTH(r.start_time)).toLocaleString("th-TH-u-ca-gregory")}`, 
      `${new Date(toTH(r.end_time)).toLocaleString("th-TH-u-ca-gregory")}`,
      null,
    ]),
    y: sortedFiltered.flatMap((r) => [r.mood[mood], r.mood[mood], null]),
  }));

  useEffect(() => {
    Plotly.newPlot("graph-2", traces2, {
      xaxis: {
        title: "Session",
        type: "category",
        tickangle: -45,
        nticks: 16,
      },
      yaxis: { title: "Score" },
      margin: { b: 120 },
      width: window.innerWidth * 0.8,
    }, { responsive: true });
  }, [records, activities]);

  return (
    <div className="linegraph">
      <h2 className="linegraph-1-header">Show me my...</h2>
      <div className="linegraph-1-choices">
        {activities_list.map((item) => (
          <div
            key={item}
            className={`linegraph-1 ${activities.includes(item) ? "linegraph-1--active" : ""}`}
            onClick={() => toggleActivity(item)}
          >
            {item}
          </div>
        ))}
      </div>
      <div id="graph-1" />
      <div id="graph-2" />
    </div>
  );
}

export default LineGraph;