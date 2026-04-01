import { useState } from "react";
import { apiRequest } from "../api";

export default function ActivityForm({ onNewActivity }) {
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const [isOutdoor, setIsOutdoor] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!type || !duration) return;

    try {
      const res = await apiRequest("/activities", {
        method: "POST",
        body: JSON.stringify({
          type,
          duration: Number(duration),
          notes,
          isOutdoor,
          date: new Date().toISOString(),
        }),
      });

      if (onNewActivity) {
        onNewActivity((prev) => [...prev, res.activity]);
      }

      setType("");
      setDuration("");
      setNotes("");
    } catch (err) {
      console.error(err);
      alert("Failed to create activity");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="activity-form">
      <h3>Log a New Activity</h3>

      <label>
        Activity Type
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
        Duration (minutes)
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
      </label>

      <label>
        Notes
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </label>

      <label>
        <input
          type="checkbox"
          checked={isOutdoor}
          onChange={(e) => setIsOutdoor(e.target.checked)}
        />
        Outdoor activity (attach weather data)
      </label>

      <button type="submit">Add Activity</button>
    </form>
  );
}