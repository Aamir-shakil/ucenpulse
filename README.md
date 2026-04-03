UCENPulse – Full Stack Fitness Dashboard
Overview

UCENPulse is a full-stack fitness and wellness tracking application that allows users to log activities, record health metrics, and visualise trends. The system was extended from a client-side prototype to a secure server-side architecture with authentication, database persistence, and third-party API integration.

The application supports activity logging, health metric tracking, reporting, and weather-based enrichment for outdoor activities.

Features
Authentication
User registration and login
JWT-based authentication
Protected API routes
Secure password hashing (bcrypt)
Activities
Create, read, update, delete activities
Outdoor activity detection
Weather API enrichment
Duration tracking
Metrics
Track steps, sleep, water, and calories
Persistent database storage
Trend visualisation support
Reports
Summary analytics endpoint
Total activities
Total duration
Outdoor activity count
Average metrics
Weather Integration
Browser geolocation
Open-Meteo API integration
Temperature and wind speed logging
Outdoor activity enrichment
Testing
Automated integration tests
Authentication tests
CRUD endpoint tests
Report endpoint tests
Isolated test database
Documentation
Swagger / OpenAPI documentation
RESTful endpoint definitions
Request/response examples

Installation
Clone repository
git clone https://github.com/Aamir-shakil/ucenpulse.git
cd ucenpulse
Server Setup
cd ucenpulse-server
npm install

Create .env

DATABASE_URL="file:./dev.db"
JWT_SECRET="your_secret"
PORT=3000

Run server

npm run dev
Client Setup
cd ucenpulse-client
npm install
npm run dev
API Documentation

Swagger UI available at:

http://localhost:3000/api-docs

Endpoints include:

POST /api/auth/register
POST /api/auth/login

GET /api/activities
POST /api/activities
PUT /api/activities/:id
DELETE /api/activities/:id

GET /api/metrics
POST /api/metrics
DELETE /api/metrics/:id

GET /api/reports/summary
Testing

Run automated tests:

npm test

Tests cover:

Authentication
Activities CRUD
Metrics CRUD
Report endpoint
Protected routes

Tests use a separate database (test.db) to avoid modifying development data.

Environment Variables
Development
DATABASE_URL="file:./dev.db"
JWT_SECRET="your_secret"
PORT=3000
Testing
DATABASE_URL="file:./test.db"
NODE_ENV=test
Weather Integration

Outdoor activities automatically fetch weather data using:

Browser geolocation
Open-Meteo API
Temperature
Wind speed

This enriches activity data with contextual environmental information.
