/**
 * main.jsx
 * --------
 * Entry point for the UCENPulse React application.
 *
 * Responsibilities:
 * - Import global styles
 * - Import the root App component
 * - Initialize and render the React application into the DOM
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
