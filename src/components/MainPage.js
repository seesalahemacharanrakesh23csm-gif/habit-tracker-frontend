// src/components/MainPage.js
import React, { useState, useEffect } from "react";

function MainPage({ user, setUser }) {
  const [habits, setHabits] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");

  // Fetch habits
  const fetchHabits = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/habits", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setHabits(data);
      } else if (Array.isArray(data.habits)) {
        setHabits(data.habits);
      } else {
        setHabits([]);
      }
    } catch (err) {
      console.error("Error fetching habits:", err);
      setHabits([]);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  // Add a new habit
  const handleAddHabit = async (e) => {
    e.preventDefault();
    if (!title) return;
    try {
      const res = await fetch("http://localhost:5000/api/habits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });
      const newHabit = await res.json();
      setHabits([...habits, newHabit]);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error("Error adding habit:", err);
    }
  };

  // Toggle completed
  const toggleCompleted = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/habits/${id}/toggle`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedHabit = await res.json();
      setHabits(habits.map((h) => (h._id === id ? updatedHabit : h)));
    } catch (err) {
      console.error("Error toggling habit:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <div style={styles.container}>
      <h1>{user.name}'s Habit Tracker</h1>
      <button onClick={handleLogout} style={styles.logoutBtn}>
        Logout
      </button>

      <form onSubmit={handleAddHabit} style={styles.form}>
        <input
          type="text"
          placeholder="Habit Title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.addBtn}>Add Habit</button>
      </form>

      <ul style={styles.list}>
        {habits.map((habit) => (
          <li key={habit._id} style={styles.listItem}>
            <input
              type="checkbox"
              checked={habit.completed || false}
              onChange={() => toggleCompleted(habit._id)}
            />
            <span
              style={{
                ...styles.habitTitle,
                textDecoration: habit.completed ? "line-through" : "none",
              }}
            >
              {habit.title}
            </span>
            {habit.description && (
              <span style={styles.habitDesc}> - {habit.description}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Inline CSS
const styles = {
  container: {
    maxWidth: 600,
    margin: "50px auto",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  logoutBtn: {
    float: "right",
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: 5,
    cursor: "pointer",
  },
  form: { display: "flex", gap: 10, marginBottom: 20 },
  input: { flex: 1, padding: 8, borderRadius: 5, border: "1px solid #ccc" },
  addBtn: {
    padding: "8px 12px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
  list: { listStyle: "none", padding: 0 },
  listItem: {
    padding: 10,
    borderBottom: "1px solid #ddd",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  habitTitle: { fontWeight: "bold" },
  habitDesc: { color: "#666", fontStyle: "italic" },
};

export default MainPage;



















