import { useState, useEffect } from "react";
import { loadData } from "../storage";
import ActivityForm from "./ActivityForm";
import MetricsForm from "./MetricsForm";
import TrendsChart from "./TrendsChart";

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

      {/* Summary */}
      <div className="dashboard-summary">
        <strong>Total activities logged:</strong> {activities.length}
      </div>

      {/* Activity Form */}
      <ActivityForm onNewActivity={setActivities} />

      {/* Activity List */}
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

      {/* Metrics Form */}
      <MetricsForm onNewMetrics={setMetrics} />

      {/* Metrics List */}
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

      {/* === Chart Grid (side-by-side charts) === */}
      {(metrics.length > 0 || activities.length > 0) && (
        <div className="chart-grid">

          {/* Steps Trend Chart */}
          {metrics.length > 0 && (
            <div className="chart-section">
              <h3>Weekly Steps Trend</h3>
              <TrendsChart
                type="line"
                title="Steps (last 7 entries)"
                yLabel="Steps"
                labels={metrics.slice(-7).map((m) =>
                  new Date(m.date).toLocaleDateString()
                )}
                data={metrics.slice(-7).map((m) => m.steps || 0)}
              />
            </div>
          )}

          {/* Activity Duration Chart */}
          {activities.length > 0 && (
            <div className="chart-section">
              <h3>Weekly Activity Duration</h3>
              <TrendsChart
                type="bar"
                title="Activity Duration (last 7 entries)"
                yLabel="Minutes"
                labels={activities.slice(-7).map((a) =>
                  `${a.type} — ${new Date(a.date).toLocaleDateString()}`
                )}
                data={activities.slice(-7).map((a) => a.duration || 0)}
              />
            </div>
          )}

        </div>
      )}

    </section>
  );
}
