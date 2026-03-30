/**
 * ActivityForm.jsx
 * ----------------
 * React component for logging daily physical activities.
 * Functionality:
 * - Handles form submission and basic validation (type and duration required).
 * - Creates a new activity object with a unique ID and timestamp.
 * - Loads current activities from localStorage and appends the new activity.
 * - Saves updated data back to localStorage.
 * - Calls onNewActivity callback to update the parent component.
 * - Resets the form fields after submission.
 */

import { useState } from "react";
import { loadData, saveData } from "../storage";

export default function ActivityForm({ onNewActivity }) {
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!type || !duration) return; // basic validation

    const newActivity = {
      id: Date.now(),
      type,
      duration,
      notes,
      date: new Date().toISOString(),
    };

    const data = loadData();
    const updatedData = {
      ...data,
      activities: [...data.activities, newActivity],
    };

    saveData(updatedData);

    if (onNewActivity) onNewActivity(updatedData.activities);

    setType("");
    setDuration("");
    setNotes("");
  };

  return (
    <form onSubmit={handleSubmit} className="activity-form">
      <h3>Log a New Activity</h3>

      <label>
        Activity Type <span className="required">*</span>
        <select value={type} onChange={(e) => setType(e.target.value)} required>
          <option value="">Select an activity</option>
          <option value="Running">Running</option>
          <option value="Cycling">Cycling</option>
          <option value="Swimming">Swimming</option>
          <option value="Gym">Gym</option>
          <option value="Yoga">Yoga</option>
          <option value="Walking">Walking</option>
        </select>
      </label>

      <label>
        Duration (minutes) <span className="required">*</span>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="e.g., 30"
          required
        />
      </label>

      <label>
        Notes (optional)
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any extra details..."
        />
      </label>

      <button type="submit">Add Activity</button>
    </form>
  );
}
