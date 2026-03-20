# Backend – HireSense AI

## Description
This directory contains the central API server and core business logic for HireSense AI. It validates authentication, parses incoming resumes, applies the SOC-based matching algorithms against the taxonomy definitions, and manages the data storage layer.

## Tech Stack
- Node.js
- Express
- TypeScript
- Multer (File Upload Handling)

## Architecture
The backend strictly follows a layered architectural pattern combining Routes, Controllers, and Services:
- `routes/`: Defines the Express API surface area and maps URLs to Controllers.
- `controllers/`: Handles HTTP request/response formatting, payload validation, and triggers Services.
- `services/`: Contains isolated pure business logic (like `matchEngineService.ts`) independent of Express objects.
- `models/`: Currently utilizes an in-memory singleton class (`memoryDb.ts`) to simulate a rapid, ephemeral hackathon database.
- `middleware/`: Handles global concerns like authorization intercepts.

## API Endpoints

### Auth
- `POST /api/auth/login` - Authenticate an organization.
- `POST /api/auth/register` - Create a new organization.

### Resumes & Reports
- `POST /api/resume/analyze` - Receives a multiparty form `resume` file and executes the `matchEngineService`.
- `POST /api/report/save` - Saves a candidate report to the database.
- `GET /api/report/history` - Fetches the historical report cache for the organization.

### Profile & Planning
- `GET /api/profile` - Fetches the currently authenticated organization's settings.
- `POST /api/profile/update` - Modifies profile details.
- `POST /api/plan/upgrade` - Upgrades the organization's pricing tier.

## How to Run
Ensure you are in the `backend` directory:
```bash
npm install
npm run dev
```
*(The server defaults to port 3001 and employs CORS to allow client interactions)*
