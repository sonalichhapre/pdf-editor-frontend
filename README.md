# DocEdit Frontend — PDF & Word Converter UI

React + Vite frontend for the DocEdit document converter. Upload, edit, and export PDF and Word documents.

## Prerequisites

- **Node.js**

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

**Note:** The backend must be running at `http://localhost:8000` (or set `VITE_API_URL` in `.env`).

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:8000` | Backend API URL |

Copy `.env.example` to `.env` and adjust for production or different backend URLs.

## Scripts

- `npm run dev` — Start dev server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
