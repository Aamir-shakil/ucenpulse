
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

