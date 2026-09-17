# Gadoon / GoDown Textile Mills — Admin Portal (Frontend)

Simple SPA demo for the Admin Portal and B2B Analytics System.

Quick start

1. Install dev dependencies (optional):

```bash
cd admin
npm install
```

2. Start local dev server (recommended):

```bash
npm start
# or
npx http-server -p 8080
```

3. Open `http://localhost:8080` in your browser (or open `index.html` directly).

Optional: start the persistence API server (Express)

```bash
cd server
npm install
npm run start
```

The API listens on port `4000` by default and exposes:
- `GET /api/sheets` — returns saved sheets
- `POST /api/sheets` — saves sheets JSON payload

Important: the server stores only the parsed sheet data as JSON. The original Excel (.xlsx/.xls) binary files are never uploaded to or stored on the backend by this demo.

Demo credentials: `admin` / `admin123`

Features
- Upload multi-sheet Excel workbooks (SheetJS)
- Auto-maps sheets to Gate / Colony modules by sheet name keywords
- Interactive data table with inline edit, per-row Save/Undo and basic validation
- Export filtered data to Excel, export analytics to PDF
- Basic dashboards (Chart.js) and KPIs

Notes
- This is a client-side demo SPA. For production use, wire to a backend API, secure authentication, and persistent storage.
