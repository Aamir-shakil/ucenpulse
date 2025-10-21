import { useState, useEffect } from "react";
import { loadData } from "../storage";
import ActivityForm from "./ActivityForm";

export default function Dashboard() {
  const [activities, setActivities] = useState(loadData().activities);

  // Refresh activities if localStorage changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = () => setActivities(loadData().activities);
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <section aria-labelledby="dashboard-heading" className="dashboard-section">
      <h2 id="dashboard-heading">Dashboard</h2>

      <p>
        Welcome to <strong>UCENPulse</strong> — your personal fitness and wellness dashboard.
      </p>
      <p>
        This is your dashboard. Log activities, track metrics, and explore trends over time.
      </p>

      <div className="dashboard-summary">
        <strong>Total activities logged:</strong> {activities.length}
      </div>

      {/* Activity logging form */}
      <ActivityForm onNewActivity={setActivities} />

      {/* Activity list */}
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
    </section>
  );
}
