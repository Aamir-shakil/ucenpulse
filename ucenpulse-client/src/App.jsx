/**
 * App.jsx
 * --------
 * Root component of the UCENPulse full-stack application.
 *
 * Responsibilities:
 * - Provide the global layout and container
 * - Include a skip link for keyboard accessibility
 * - Render either the login screen or the dashboard
 * - Handle logout by removing the stored JWT token
 */

import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { getToken } from "./api";
import "./styles.css";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(!!getToken());

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  return (
    <div className="app-root">
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Application header */}
      <header className="app-header">
        <h1>UCENPulse — Personal Fitness & Wellness</h1>
        <p className="muted">Full-stack fitness tracking dashboard</p>

        {loggedIn && (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        )}
      </header>

      {/* Main content */}
      <main id="main-content">
        {!loggedIn ? (
          <Login onLogin={() => setLoggedIn(true)} />
        ) : (
          <Dashboard />
        )}
      </main>
    </div>
  );
}