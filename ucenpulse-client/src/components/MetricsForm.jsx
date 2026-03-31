/**
 * MetricsForm.jsx
 * ----------------
 * A React component for logging daily health metrics such as steps, sleep, water intake, and calories burned.
 * Functionality:
 * - Handles form submission.
 * - Creates a new metric object with a unique ID and current timestamp.
 * - Loads existing data from localStorage using `loadData`.
 * - Appends the new metric to the metrics array and saves it using `saveData`.
 * - Calls the `onNewMetrics` callback to update the parent component.
 * - Resets the input fields after submission.
 */

import { useState } from "react";
import { apiRequest } from "../api";

export default function MetricsForm({ onNewMetrics }) {
  const [steps, setSteps] = useState("");
  const [sleep, setSleep] = useState("");
  const [water, setWater] = useState("");
  const [calories, setCalories] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await apiRequest("/metrics", {
        method: "POST",
        body: JSON.stringify({
          steps: steps ? Number(steps) : undefined,
          sleep: sleep ? Number(sleep) : undefined,
          water: water ? Number(water) : undefined,
          calories: calories ? Number(calories) : undefined,
          date: new Date().toISOString(),
        }),
      });

      if (onNewMetrics) {
        onNewMetrics((prev) => [...prev, res.metric]);
      }

      setSteps("");
      setSleep("");
      setWater("");
      setCalories("");
    } catch (err) {
      console.error(err);
      alert("Failed to create metric");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="metrics-form">
      <h3>Log Health Metrics</h3>

      <label>
        Steps
        <input
          type="number"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          placeholder="e.g., 10000"
        />
      </label>

      <label>
        Sleep (hours)
        <input
          type="number"
          value={sleep}
          onChange={(e) => setSleep(e.target.value)}
          placeholder="e.g., 7"
        />
      </label>

      <label>
        Water intake (ml)
        <input
          type="number"
          value={water}
          onChange={(e) => setWater(e.target.value)}
          placeholder="e.g., 2000"
        />
      </label>

      <label>
        Calories burned
        <input
          type="number"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          placeholder="e.g., 500"
        />
      </label>

      <button type="submit">Add Metrics</button>
    </form>
  );
}