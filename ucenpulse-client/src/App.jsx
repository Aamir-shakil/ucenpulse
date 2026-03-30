/**
 * App.jsx
 * --------
 * Root component of UCENPulse client-side application.
 *
 * Responsibilities:
 * - Provide global layout and container
 * - Include accessible "Skip Link" for keyboard navigation
 * - Render the Dashboard component where all activity and metrics functionality exists
 */
import React from 'react'
import Dashboard from './components/Dashboard'
import './styles.css'

export default function App() {
  return (
    <div className="app-root">
      {/* Skip Link*/}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <header className="app-header">
        <h1>UCENPulse — Personal Fitness & Wellness</h1>
        <p className="muted">Client-side prototype (localStorage)</p>
      </header>
      <main>
        <Dashboard />
      </main>
    </div>
  )
}

