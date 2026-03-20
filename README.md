# HireSense AI

## Overview
HireSense AI is a next-generation resume intelligence engine and candidate matching SaaS. It leverages a domain-aware scoring framework to deeply analyze candidates beyond simple keyword matching, giving recruiters an accurate, multidimensional evaluation of domain relevance, core skills, experience, and education.

## Problem Statement
The modern hiring space is flooded with generic AI screeners that treat all jobs exactly the same. They merely check if a resume contains the word "React" but fail to understand if the candidate has actual *Frontend ecosystem experience* versus just listing it. This leads to false positives and highly-qualified candidates slipping through the cracks due to poor taxonomy handling.

## Solution
HireSense AI uses a **Standard Occupational Classification (SOC)** powered taxonomy engine. It groups over 100 deep-domain roles and intelligently weighs resumes based on the explicit expectations of that specific industry. For example, a Cybersecurity role heavily weighs certifications and domain-specific tools, whereas a Creative Design role might prioritize portfolio-related indicators.

## Features
- **Industry & Role Taxonomy**: Cascading dynamic SOC-based filters ensuring precise candidate matching.
- **Resume Parsing & Intelligence**: Instantly evaluates candidates across 6 dimensions (Domain, Skills, Experience, Education, Certifications, Support).
- **Interactive Reports**: Provides detailed visual breakdowns of candidate fit, highlighting critical missing skills and ecosystem misalignment.
- **Organization Dashboards**: ATS-style history tracking, report generation, and organizational plan management (Basic, Pro, Enterprise).

## Architecture
The application has been restructured into a clean, highly modular **Full-Stack Architecture**:
- **Frontend** acts purely as the presentation, UI, routing, and user interaction layer. It no longer handles heavy business logic or mock databases.
- **Backend** acts as the definitive API and intelligence layer. All ATS scoring, mock data storage, authentication, and reporting routes strictly through the backend Express server.
- This creates a scalable boundary where the AI engine can be upgraded (e.g., swapping a regex matcher for an LLM) without touching the client interface.

## Tech Stack
**Frontend:**
- React 18, NextJS principles (Vite)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

**Backend:**
- Node.js
- Express
- TypeScript
- Multer (for File parsing)

## Project Structure
```text
HireSenseAI/
├── README.md                     ← Main project documentation
├── frontend/                     ← UI and Presentation layer
│   ├── README.md
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/             ← API interaction layer
│   │   ├── context/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── data/                 ← Taxonomy references
│   │   └── types/
│   └── package.json
└── backend/                      ← API and Business Logic layer
    ├── README.md
    ├── src/
    │   ├── routes/               ← Express API Routing
    │   ├── controllers/          ← Request handling
    │   ├── services/             ← Core domain & scoring logic
    │   ├── models/               ← Mock DB Layer
    │   ├── middleware/           ← Auth interception
    │   └── utils/
    ├── server.ts                 ← Node entry point
    └── package.json
```

## Setup Instructions
To run this project locally, you must run both the frontend and the backend servers simultaneously.

**Terminal 1 (Backend):**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm install
npm run dev
```

## Future Scope
- **Postbase/SQLite Integration**: Transition the `memoryDb` into a persistent relational database for genuine production data management.
- **Real PDF Text Extraction**: Implement `pdf-parse` into the backend `resumeParserService` to evaluate actual PDF text chunks instead of simulating.
- **LLM Integration**: Pass parsed resume text chunks into OpenAI/Anthropic APIs alongside the `taxonomy.json` rules for highly nuanced evaluations.
