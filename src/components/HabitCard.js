import React from "react";

const HabitCard = ({ habit, toggleComplete }) => {
  return (
    <div style={styles.card}>
      <input
        type="checkbox"
        checked={habit.completed}
        onChange={toggleComplete}
        style={styles.checkbox}
      />
      <span style={{ 
        ...styles.habitName, 
        textDecoration: habit.completed ? "line-through" : "none" 
      }}>
        {habit.name}
      </span>
    </div>
  );
};

const styles = {
  card: {
    display: "flex",
    alignItems: "center",
    padding: "8px 12px",
    margin: "6px 0",
    border: "1px solid #ddd",
    borderRadius: "6px",
    backgroundColor: "#f9f9f9",
  },
  checkbox: {
    marginRight: "12px",
    width: "18px",
    height: "18px",
  },
  habitName: {
    fontSize: "16px",
    color: "#333",
  },
};

export default HabitCard;
