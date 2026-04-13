const BASE_URL = `${import.meta.env.VITE_API_URL}/activities`;

export async function getActivities() {
  const res = await fetch(`${BASE_URL}/me`, {
    method: "GET",
    credentials: "include"
  });
  return res.json();
}
export async function createActivity(activity, description, start_time, end_time, duration_minutes, mood) {
  const res = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify({ activity, description, start_time, end_time, duration_minutes, mood }),
    credentials: "include"
  });
  return res.json();
}

export async function updateActivity(activityId, activity, description, start_time, end_time, duration_minutes, mood) {
  const res = await fetch(`${BASE_URL}/${activityId}`, {
    method: "PUT",
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify({ activity, description, start_time, end_time, duration_minutes, mood }),
    credentials: "include"
  });
  return res.json();
}
export async function deleteActivity(activityId) {
  const res = await fetch(`${BASE_URL}/${activityId}`, {
    method: "DELETE",
    credentials: "include",
  });
  return res.json();
}

