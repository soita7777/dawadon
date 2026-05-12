# Pharmaceutical Management System

Full-stack app with React frontend, Node.js backend, and PostgreSQL persistence.

## Project layout

- `client/` — React + Vite frontend
- `server/` — Express backend API

## Setup

1. Install dependencies at root:
   ```bash
   npm install
   npm run install-client
   npm run install-server
   ```

2. Start development servers:
   ```bash
   npm run dev
   ```

3. Backend example endpoint:
   - `http://localhost:4000/api/status`

4. Frontend runs at:
   - `http://localhost:5173`

## Next steps

- Add PostgreSQL connection and models
- Add user auth routes and JWT handling
- Add inventory and prescription CRUD APIs
- Build React pages for login, dashboard, inventory, prescriptions, and reports
- Configure GitHub Pages or GitHub Actions for deployment
