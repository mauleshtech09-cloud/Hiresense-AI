# Frontend – HireSense AI

## Description
This directory contains the entire UI, presentation, and client-side logic layer of the HireSense AI application. It is completely decoupled from business logic and database management, interacting only through asynchronous service layers with the backend API.

## Tech Stack
- React / Vite
- TypeScript
- Tailwind CSS
- Framer Motion

## Folder Structure
- `src/components/`: Reusable, stateless UI blocks (Sidebar, Charts, Inputs).
- `src/pages/`: Main route views (Login, Scanner, History, Settings).
- `src/services/`: Fetch wrappers strictly defining the Backend REST contract (`apiService`, `authService`, etc).
- `src/context/`: Global React state (Authentication and Application state) fed by backend responses.
- `src/data/`: Static client-side configurations like `taxonomy.json` for rapid UI filter cascading.

## Features
- **Cascading Taxonomy Filters**: Form interfaces that strictly limit user selection based on predefined valid SOC criteria.
- **Interactive Radar & Donut Charts**: Visualizes candidate dimension scores cleanly.
- **Framer Motion Animations**: Polished micro-interactions, loading states, and page transitions for a premium ATS feel.
- **Theme System**: Advanced Tailwind configured CSS variables for instant aesthetic switching.

## How to Run
Ensure you are in the `frontend` directory:
```bash
npm install
npm run dev
```
*(Ensure the backend is running on port 3001 for functionality)*
