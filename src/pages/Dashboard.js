import React, { useEffect, useState } from "react";
import axios from "axios";
import HabitCard from "../components/HabitCard";

export default function Dashboard({ user, onLogout }) {
  const [habits, setHabits] = useState([]);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const fetchHabits = async () => {
    try {
      const res = await axios.get(`/api/habits/${user.userId}`);
      setHabits(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const addHabit = async () => {
    if (!title.trim()) return;
    await axios.post("/api/habits", { userId: user.userId, title, note });
    setTitle("");
    setNote("");
    fetchHabits();
  };

  const markComplete = async (id) => {
    try {
      await axios.put(`/api/habits/${id}/complete`);
      fetchHabits();
    } catch (err) {
      alert(err.response?.data?.msg || "Failed");
    }
  };

  const deleteHabit = async (id) => {
    if (!window.confirm("Delete this habit?")) return;
    await axios.delete(`/api/habits/${id}`);
    fetchHabits();
  };

  const updateHabit = async (id, update) => {
    await axios.put(`/api/habits/${id}`, update);
    fetchHabits();
  };

  const today = new Date();
  const dateStr = today.toLocaleDateString();
  const dayStr = today.toLocaleDateString(undefined, { weekday: "long" });

  return (
    <div className="container">
      <header className="topbar">
        <div>
          <h1>Hi, {user.name || user.username} 👋</h1>
          <p>{dayStr}, {dateStr}</p>
        </div>
        <div>
          <button onClick={onLogout}>Logout</button>
        </div>
      </header>

      <section className="add-section">
        <input placeholder="Habit title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="Note (optional)" value={note} onChange={(e) => setNote(e.target.value)} />
        <button onClick={addHabit}>Add Habit</button>
      </section>

      <section className="grid">
        {habits.length === 0 ? <p>No habits yet. Add one!</p> : habits.map(h => (
          <HabitCard
            key={h._id}
            habit={h}
            onComplete={markComplete}
            onDelete={deleteHabit}
            onUpdate={updateHabit}
          />
        ))}
      </section>
    </div>
  );
}
