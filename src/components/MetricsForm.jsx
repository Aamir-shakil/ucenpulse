import { useState } from "react";
import { loadData, saveData } from "../storage";

export default function MetricsForm({ onNewMetrics }) {
  const [steps, setSteps] = useState("");
  const [sleep, setSleep] = useState("");
  const [water, setWater] = useState("");
  const [calories, setCalories] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMetric = {
      id: Date.now(),
      steps: steps || null,
      sleep: sleep || null,
      water: water || null,
      calories: calories || null,
      date: new Date().toISOString(),
    };

    const data = loadData();
    const updatedData = {
      ...data,
      metrics: [...data.metrics, newMetric],
    };

    saveData(updatedData);

    if (onNewMetrics) onNewMetrics(updatedData.metrics);

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
