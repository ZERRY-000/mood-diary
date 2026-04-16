import requests
import streamlit as st
import pandas as pd
import plotly.express as px

st.set_page_config(page_title="Activity Mood Tracker", layout="wide")
st.title("🧠 Activity Mood Tracker")

# --- Login ---
with st.sidebar:
    st.header("Login")
    email = st.text_input("Email")
    password = st.text_input("Password", type="password")
    login_btn = st.button("Login")

if "token" not in st.session_state:
    st.session_state.token = None

if login_btn:
    res = requests.post("http://localhost:3000/api/v1/auth/login", json={"email": email, "password": password})
    if res.status_code == 200:
        st.session_state.token = res.json()["token"]
        st.sidebar.success("Logged in!")
    else:
        st.sidebar.error("Login failed")

if not st.session_state.token:
    st.info("Please login to view your data.")
    st.stop()

# --- Fetch Activities ---
headers = {"Authorization": f"Bearer {st.session_state.token}"}
res = requests.get("http://localhost:3000/api/v1/activities/me", headers=headers)
# st.write(res.status_code)
# st.write(res.text)
if res.status_code != 200:
    st.error("Failed to fetch activities")
    st.stop()

df = pd.DataFrame(res.json())
df["start_time"] = pd.to_datetime(df["start_time"])
df["date"] = df["start_time"].dt.date

# แยก mood ออกมาเป็น column
mood_df = pd.json_normalize(df["mood"])
df = pd.concat([df.drop(columns=["mood"]), mood_df], axis=1)

# --- Charts ---
# col1, col2 = st.columns(2)
# col1, col2 = st.columns(2)

# with col1:
#     st.subheader("⏱ Duration by Activity")
#     fig = px.bar(df.groupby("activity")["duration_minutes"].sum().reset_index(),
#                  x="activity", y="duration_minutes", color="activity")
#     st.plotly_chart(fig, use_container_width=True)

# with col2:
#     st.subheader("📊 Activity Count")
#     fig = px.pie(df, names="activity")
#     st.plotly_chart(fig, use_container_width=True)


st.subheader("⏱ Duration by Activity")
fig = px.bar(df.groupby("activity")["duration_minutes"].sum().reset_index(),
                x="activity", y="duration_minutes", color="activity")
st.plotly_chart(fig, use_container_width=True)

st.subheader("😊 Average Mood by Activity")
mood_cols = ["happy", "sad", "angry", "fearful", "disgusted", "surprised"]
avg_mood = df.groupby("activity")[mood_cols].mean().reset_index()
fig = px.bar(avg_mood.melt(id_vars="activity", value_vars=mood_cols),
             x="activity", y="value", color="variable", barmode="group")
st.plotly_chart(fig, use_container_width=True)

st.subheader("📅 Timeline")
fig = px.timeline(df, x_start="start_time", x_end="end_time", y="activity", color="activity")
st.plotly_chart(fig, use_container_width=True)

st.subheader("📋 Raw Data")
st.dataframe(df[["date", "activity", "description", "duration_minutes"] + mood_cols])