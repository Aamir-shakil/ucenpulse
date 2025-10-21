import { useState, useEffect } from "react";
import { loadData } from "../storage";
import ActivityForm from "./ActivityForm";
import MetricsForm from "./MetricsForm";

export default function Dashboard() {
  const [activities, setActivities] = useState(loadData().activities);
  const [metrics, setMetrics] = useState(loadData().metrics);

  useEffect(() => {
    const handleStorageChange = () => {
      const data = loadData();
      setActivities(data.activities);
      setMetrics(data.metrics);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <section aria-labelledby="dashboard-heading" className="dashboard-section">
      <h2 id="dashboard-heading">Dashboard</h2>

      <p>
        Welcome to <strong>UCENPulse</strong> — your personal fitness and wellness dashboard.
      </p>

      <div className="dashboard-summary">
        <strong>Total activities logged:</strong> {activities.length}
      </div>

      <ActivityForm onNewActivity={setActivities} />
      {activities.length > 0 && (
        <div className="activity-list">
          <h3>Logged Activities</h3>
          <ul>
            {activities.map((a) => (
              <li key={a.id}>
                <strong>{a.type}</strong> — {a.duration} mins
                {a.notes && ` — Notes: ${a.notes}`}
              </li>
            ))}
          </ul>
        </div>
      )}

      <MetricsForm onNewMetrics={setMetrics} />
      {metrics.length > 0 && (
        <div className="metrics-list">
          <h3>Logged Metrics</h3>
          <ul>
            {metrics.map((m) => (
              <li key={m.id}>
                {m.steps && `Steps: ${m.steps}, `}
                {m.sleep && `Sleep: ${m.sleep}h, `}
                {m.water && `Water: ${m.water}ml, `}
                {m.calories && `Calories: ${m.calories}`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
