# Strath-Air Backend (Node + Express)

## Getting started

1. Install dependencies:

   npm install

2. Copy `.env.example` to `.env` and adjust settings if needed.

3. Start in development mode:

   npm run dev

The API will be available at:

- http://localhost:4000/api

Key endpoints:

- POST /api/auth/login
- GET  /api/jobs/my
- GET  /api/jobs/:id
- POST /api/jobs/:id/start
- POST /api/jobs/:id/complete
- GET  /api/checklists/job/:jobId
- POST /api/checklists/:jobChecklistId/save
- GET  /api/status

These are demo implementations using in-memory data.
Replace with real database logic according to the provided schema.
