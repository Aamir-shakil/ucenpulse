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
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="e.g., Running, Cycling"
          required
        />
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
