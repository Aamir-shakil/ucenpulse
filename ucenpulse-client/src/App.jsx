import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { getToken } from "./api";
import "./styles.css";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(!!getToken());

  return (
    <div className="app-root">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header className="app-header">
        <h1>UCENPulse — Personal Fitness & Wellness</h1>
        <p className="muted">Server-backed version</p>
      </header>

      <main>
        {!loggedIn ? (
          <Login onLogin={() => setLoggedIn(true)} />
        ) : (
          <Dashboard />
        )}
      </main>
    </div>
  );
}