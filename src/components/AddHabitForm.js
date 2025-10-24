import React, { useState } from 'react';

function AddHabitForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('daily');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5000/api/habits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ title, description, frequency }),
      });
      if (!res.ok) throw new Error('Failed to add habit');
      const data = await res.json();
      onAdd(data);
      setTitle('');
      setDescription('');
      setFrequency('daily');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="add-habit-form" onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Habit title" required />
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description (optional)" />
      <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
}

export default AddHabitForm;