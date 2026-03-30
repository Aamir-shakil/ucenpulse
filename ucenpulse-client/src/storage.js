// storage.js — client-side storage helpers

// Key used in localStorage
export const STORAGE_KEY = 'ucenpulse:data'

// Default structure for your app data
export const defaultData = {
  activities: [], // e.g., running, cycling, gym
  metrics: []     // e.g., steps, sleep, calories
}

// Load data from localStorage
export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : defaultData
  } catch (e) {
    console.error('Error loading data from localStorage:', e)
    return defaultData
  }
}

// Save data to localStorage
export function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (e) {
    console.error('Error saving data to localStorage:', e)
  }
}
