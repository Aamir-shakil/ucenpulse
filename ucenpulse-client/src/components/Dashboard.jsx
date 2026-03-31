/**
 * Dashboard.jsx
 * --------------
 * Responsibilities:
 * - Load and display activity and metric data from the backend API
 * - Provide forms for adding new activities and metrics
 * - Show summary information and visual trends using charts
 * - Support responsive layout and accessibility
 *
 * Data is now retrieved from protected server-side API endpoints.
 */
import { useState, useEffect } from "react";
import ActivityForm from "./ActivityForm";
import MetricsForm from "./MetricsForm";
import TrendsChart from "./TrendsChart";
import { apiRequest } from "../api";

export default function Dashboard() {
  const [activities, setActivities] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [range, setRange] = useState("7"); // Default last 7 entries
  const [error, setError] = useState("");

  useEffect(() => {
    /**
     * Fetch activities and metrics from the backend API
     * when the dashboard first loads.
     */
    const fetchData = async () => {
      try {
        const activitiesRes = await apiRequest("/activities");
        const metricsRes = await apiRequest("/metrics");

        setActivities(activitiesRes.activities || []);
        setMetrics(metricsRes.metrics || []);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
        setError("Failed to load dashboard data.");
      }
    };

    fetchData();
  }, []);

  // Sort entries by date ascending
  const sortedMetrics = [...metrics].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  const sortedActivities = [...activities].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // Filter displayed chart data based on selected range
  const filteredMetrics =
    range === "all" ? sortedMetrics : sortedMetrics.slice(-Number(range));
  const filteredActivities =
    range === "all" ? sortedActivities : sortedActivities.slice(-Number(range));

  return (
    <section
      id="main-content"
      aria-labelledby="dashboard-heading"
      className="dashboard-section"
    >
      <h2 id="dashboard-heading">Dashboard</h2>

      <p>
        Welcome to <strong>UCENPulse</strong> — your personal fitness and wellness
        dashboard.
      </p>

      {/* Error message if backend data fails to load */}
      {error && <p className="error-message">{error}</p>}

      {/* Summary */}
      <div className="dashboard-summary">
        <strong>Total activities logged:</strong> {activities.length}
      </div>

      {/* Activity Form */}
      <ActivityForm onNewActivity={setActivities} />

      {/* Activity List */}
      {activities.length > 0 && (
        <div className="card activity-list">
          <h3>Logged Activities</h3>
          <ul>
            {sortedActivities.map((a) => (
              <li key={a.id}>
                <strong>{a.type}</strong> — {a.duration} mins
                {a.notes && ` — Notes: ${a.notes}`}
                {a.isOutdoor && a.weatherTemp !== null && (
                  <>
                    {" "}
                    — Weather: {a.weatherTemp}°C, wind {a.weatherWindSpeed} km/h
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Metrics Form */}
      <MetricsForm onNewMetrics={setMetrics} />

      {/* Metrics List */}
      {metrics.length > 0 && (
        <div className="card metrics-list">
          <h3>Logged Metrics</h3>
          <ul>
            {sortedMetrics.map((m) => (
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

      {/* Chart Range Filter */}
      {(metrics.length > 0 || activities.length > 0) && (
        <div className="chart-filters">
          <label htmlFor="range-filter">
            <strong>Show:</strong>
          </label>
          <select
            id="range-filter"
            value={range}
            onChange={(e) => setRange(e.target.value)}
          >
            <option value="7">Last 7 entries</option>
            <option value="30">Last 30 entries</option>
            <option value="all">All entries</option>
          </select>
        </div>
      )}

      {/* Chart Grid */}
      {(metrics.length > 0 || activities.length > 0) && (
        <div className="chart-grid">
          {/* Steps Trend Chart */}
          {metrics.length > 0 && (
            <figure className="chart-section">
              <h3>Steps Trend</h3>
              <TrendsChart
                type="line"
                title={`Steps (last ${range} entries)`}
                yLabel="Steps"
                labels={filteredMetrics.map((m) =>
                  new Date(m.date).toLocaleDateString()
                )}
                data={filteredMetrics.map((m) => m.steps || 0)}
              />
              <figcaption className="sr-only">
                Line chart showing your step counts over the selected range.
              </figcaption>
            </figure>
          )}

          {/* Activity Duration Chart */}
          {activities.length > 0 && (
            <figure className="chart-section">
              <h3>Activity Duration</h3>
              <TrendsChart
                type="bar"
                title={`Activity Duration (last ${range} entries)`}
                yLabel="Minutes"
                labels={filteredActivities.map(
                  (a) => `${a.type} — ${new Date(a.date).toLocaleDateString()}`
                )}
                data={filteredActivities.map((a) => a.duration || 0)}
              />
              <figcaption className="sr-only">
                Bar chart showing your logged activities over the selected range.
              </figcaption>
            </figure>
          )}
        </div>
      )}
    </section>
  );
}