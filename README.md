# Gadoon Textile Mills — Admin Portal

Admin Portal & B2B Analytics — single-page React app (UMD) with a lightweight Express backend.

Overview
- Frontend: single-file SPA `index.html` (React UMD + precompiled JSX), Tailwind CSS, Chart.js, SheetJS (XLSX), FileSaver, jsPDF.
- Backend: Express API (`server/index.js`) that persists parsed sheets JSON to `server/data/sheets.json`.

Highlights / Features
- Upload and parse Excel workbooks (multi-sheet) using SheetJS.
- Interactive table: inline edits, per-row Save / Undo, add entry modal, pagination.
- Charts and KPIs (Chart.js) driven from parsed sheet data.
- Export: filtered sheet export, export all sheets, PDF exports for analytics.
- Drag & drop upload and downloadable sample Excel files in `samples/`.

Quick start (local)
1. Install project dependencies (project root):

```bash
npm install
```

2. Start the persistence API server (optional but recommended):

```bash
cd server
npm install
npm start
# server listens on http://localhost:4000
```

3. Serve the frontend (from project root). Example using `npx http-server`:

```bash
npx http-server -p 8080 .
# open http://127.0.0.1:8080
```

Alternative: use Python's simple server:

```bash
python3 -m http.server 8080
```

Developer utilities
- Programmatically generate an XLSX from saved server data:

```bash
node scripts/generate_export.js
# writes export_test.xlsx to project root
```

Notes & troubleshooting
- The SPA was precompiled from inline JSX. To avoid top-level ES imports in the compiled output we added a small `_jsxDEV` shim inside `index.html`. If you re-run JSX compilation prefer Babel with `runtime: 'classic'` or re-bundle with a modern bundler.
- Legacy chart helpers expect a global `window.sheets`; the React app assigns `window.sheets = sheets` so `updateCharts()` reads the current state.
- Vendored UMD libraries live under `assets/libs/` to avoid cross-origin script error masking.

Changelog (recent)
- Fixed transpiled output containing ES module imports by adding a runtime shim.
- Exposed React `sheets` state as `window.sheets` so global chart helpers work.
- Added error overlay for clearer runtime errors and safer render error handling.
- Added `scripts/generate_export.js` to validate exports and created `export_test.xlsx` during verification.
- Added provided sample Excel files (`samples/`) and a logo under `assets/`.

Repository
- Pushed to: https://github.com/kAmmarah/admin.git (branch: `main`)

Next steps / suggestions
- I can run an interactive visual walkthrough and fix any UI/runtime issues reported from the browser.
- For production readiness, consider migrating the project to a bundler (Vite/Rollup/Webpack) to eliminate shims and enable module builds, add authentication, and persist original uploads in a secure storage.

If you want wording changes or additional sections (CI, deployment, contributors), tell me what to add.
