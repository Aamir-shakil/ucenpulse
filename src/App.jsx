
import React from 'react'
import Dashboard from './components/Dashboard'
import './styles.css'

export default function App(){
  return (
    <div className="app-root">
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

