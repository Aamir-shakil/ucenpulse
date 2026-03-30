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
import { loadData, saveData } from "../storage";

export default function MetricsForm({ onNewMetrics }) {
  const [steps, setSteps] = useState("");
  const [sleep, setSleep] = useState("");
  const [water, setWater] = useState("");
  const [calories, setCalories] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create new metric entry
    const newMetric = {
      id: Date.now(),
      steps: steps || null,
      sleep: sleep || null,
      water: water || null,
      calories: calories || null,
      date: new Date().toISOString(),
    };

    // Load current data and update metrics
    const data = loadData();
    const updatedData = {
      ...data,
      metrics: [...data.metrics, newMetric],
    };

    // Save updated data to localStorage
    saveData(updatedData);

    // Call parent callback to update metrics state
    if (onNewMetrics) onNewMetrics(updatedData.metrics);

    // Reset form fields
    setSteps("");
    setSleep("");
    setWater("");
    setCalories("");
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
