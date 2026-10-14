# ThreatNexus — Detect. Connect. Protect.

ThreatNexus is a hackathon-ready AI-assisted Digital Risk Protection prototype. It demonstrates how a brand security team can review potentially fake social profiles, suspicious URLs, and impersonating mobile applications, assign explainable risk scores, and explore evidence-based relationships in a threat graph.

> **Important:** This project is a prototype. Its built-in scoring rules are heuristic demonstrations, not a validated machine-learning model or a guarantee that an asset is malicious. The seeded incidents are simulated demo data. Verify findings using trusted sources before taking action.

## Features

- **Dashboard:** overview KPIs, risk distribution, scan trends, recent detections.
- **Profile checks:** username/brand similarity, impersonation language, suspicious profile signals.
- **Link checks:** URL parsing, lookalike host signals, misleading subdomains, URL shorteners, suspicious keywords, HTTPS signal.
- **Application checks:** app/publisher identity mismatch, brand-name similarity, suspicious permission signals, unofficial-source indicators.
- **Explainable scoring:** 0–100 score, Low / Medium / High / Critical labels, triggered evidence and suggested next steps.
- **Threat graph:** interactive graph of sample profiles, domains and apps, with evidence-based sample relationships.
- **Scan history:** scan results remain in backend memory while the server process is running.
- **API health endpoint** and CORS configuration for local development and Render.
- **Demo data:** enables a working presentation without third-party API keys.

## Technology

- Frontend: React, Vite, React Router, Axios, Recharts, React Flow (`@xyflow/react`), Lucide icons.
- Backend: Node.js, Express, Helmet, CORS, Morgan, express-rate-limit.
- Storage: in-memory prototype data. Data resets when the backend restarts. Add a database before using this for persistent production records.
- Deployment: Render Static Site + Render Web Service.

## Project structure

```text
ThreatNexus/
├── frontend/
│   ├── src/
│   │   ├── components/       # Sidebar, layout, KPI cards, threat graph
│   │   ├── pages/            # Dashboard, scanners, threat intelligence
│   │   ├── services/api.js   # Axios client
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── index.html
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── data/demoData.js
│   │   ├── middleware/errorHandler.js
│   │   ├── routes/
│   │   ├── services/          # Detection and scoring rules
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── render.yaml
├── .gitignore
└── README.md
```

## Requirements

Install:
- Node.js 20 or newer (LTS recommended)
- npm
- Git (for GitHub upload)

Check versions:

```bash
node --version
npm --version
git --version
```

## Run locally on Windows PowerShell

### 1. Start the backend

Open PowerShell in the extracted `ThreatNexus` folder:

```powershell
cd backend
Copy-Item .env.example .env
npm install
npm run dev
```

Backend default: `http://localhost:5000`  
Health check: `http://localhost:5000/api/health`

Leave this terminal open.

### 2. Start the frontend

Open a **second** PowerShell terminal in the extracted `ThreatNexus` root folder:

```powershell
cd frontend
Copy-Item .env.example .env
npm install
npm run dev
```

Open the Vite URL printed in the terminal, usually `http://localhost:5173`.

### macOS/Linux alternative

Run each in its own terminal:

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

## API endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | API status |
| GET | `/api/dashboard/summary` | KPI totals and risk counts |
| GET | `/api/dashboard/trends` | Demo scan trend data |
| GET | `/api/threats` | Recent threat records |
| GET | `/api/graph` | Nodes and edges for the threat graph |
| POST | `/api/profiles/scan` | Analyze a profile's submitted metadata |
| POST | `/api/links/scan` | Analyze a URL string |
| POST | `/api/apps/scan` | Analyze application metadata |

### Example API request

PowerShell:

```powershell
Invoke-RestMethod -Method Post `
  -Uri http://localhost:5000/api/links/scan `
  -ContentType "application/json" `
  -Body '{"url":"https://paypaI-security.example-login.com/verify"}'
```

The returned score is a heuristic indicator for demonstration. Do not use a scan result alone as proof of fraud.

## Risk score interpretation

| Score | Level | Suggested handling |
|---:|---|---|
| 0–29 | Low | Record and monitor |
| 30–59 | Medium | Review the evidence |
| 60–79 | High | Prioritize investigation |
| 80–100 | Critical | Urgent human verification |

Each scanner returns the score, risk level, triggered evidence, a short explanation and recommended next action. The rules are intentionally visible in `backend/src/services/`.

## GitHub: upload the project

1. Create an empty repository on GitHub, for example `ThreatNexus`.
2. Open PowerShell in the extracted project root (the folder containing this README).
3. Replace `YOUR-OWNER` with your GitHub username or organization.

```powershell
git init
git add .
git commit -m "Initial ThreatNexus project"
git branch -M main
git remote add origin https://github.com/YOUR-OWNER/ThreatNexus.git
git push -u origin main
```

If `origin` already exists, check it first:

```powershell
git remote -v
```

### GitHub authentication

GitHub no longer accepts account passwords for HTTPS Git pushes. Use GitHub CLI:

```powershell
gh auth login
gh auth setup-git
gh auth status
git push -u origin main
```

Install GitHub CLI first if it is not installed. Alternatively, use a valid Personal Access Token through a secure credential prompt. Never commit a token, password or `.env` file.

## Invite and tag teammates

### Invite collaborators
1. Open the repository on GitHub.
2. Open **Settings → Collaborators** (or repository access settings for an organization).
3. Invite teammates by GitHub username.
4. Teammates must accept the invitation.

### Suggested work split
- Teammate 1: profile detection and tests
- Teammate 2: link and application detection
- Teammate 3: dashboard, graph and presentation
- Team lead: integration, pull-request review and deployment

### Use a feature branch

```powershell
git checkout -b feature/profile-detection
git add .
git commit -m "Improve profile detection"
git push -u origin feature/profile-detection
```

Open a Pull Request on GitHub and merge after review.

### Tag/mention teammates
In an issue, pull request, or comment, type `@github-username` and select the teammate. This mentions them; it is not the same as a Git release tag.

### Create a version tag

After the final version is merged into `main`:

```powershell
git checkout main
git pull origin main
git tag -a v1.0.0 -m "ThreatNexus hackathon release"
git push origin v1.0.0
```

## Deploy on Render

You can deploy both services from the same GitHub repository.

### Option A: use the included `render.yaml`
1. Push the project to GitHub.
2. In Render, choose **New → Blueprint** and connect the repository.
3. Render reads `render.yaml` and creates the backend web service and frontend static site.
4. Review the generated services and deploy.
5. Confirm the frontend's `VITE_API_URL` points to the deployed backend URL.

### Option B: create services manually

**Backend Web Service**
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`
- Health Check Path: `/api/health`
- Environment: `NODE_ENV=production`
- `FRONTEND_URL`: your deployed frontend URL

**Frontend Static Site**
- Root Directory: `frontend`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- Environment: `VITE_API_URL=https://YOUR-BACKEND.onrender.com/api`

For a React Router single-page application, add a Render rewrite rule from `/*` to `/index.html` with action `Rewrite` if direct navigation to nested pages returns 404.

Render may take time to start an inactive free web service. Test both URLs before presenting.

## Security and limitations

- This prototype analyzes submitted text and metadata; it does not automatically crawl all social platforms or app stores.
- It does not download or execute APKs and does not open submitted URLs. Avoid adding server-side URL fetching without SSRF protections.
- It uses heuristic rules rather than a trained/validated AI model. Do not advertise accuracy percentages unless evaluated against a labeled test dataset.
- Demo incidents and graph links are synthetic.
- The backend currently stores new scans in memory. Add persistent database storage, authentication, authorization, audit logging and retention controls before production use.
- Keep secrets server-side. Never put secret keys in `VITE_*` variables because they are exposed in the browser bundle.
- Treat results as leads for human review, not automatic accusations or takedown decisions.

## Troubleshooting

**Frontend says “API unavailable”**
- Ensure backend is running on port 5000.
- Check `frontend/.env` contains `VITE_API_URL=http://localhost:5000/api`.
- Restart Vite after changing `.env`.

**CORS error**
- Set `FRONTEND_URL` in `backend/.env` to the exact frontend origin, including scheme and port.
- Restart backend.

**Port already in use**
- Stop the other process or change `PORT` in `backend/.env`, then update the API URL.

**Git push authentication failed**
- Run `gh auth login`, then `gh auth setup-git`, and retry.

## Hackathon evaluation alignment

The design supports the previously shared rubric:
- Social Media Monitoring — 30%
- App Store Monitoring — 30%
- Brand Profile — 15%
- User Experience — 15%
- Presentation & Demo — 10%

Use official brand reference information and clearly labeled simulated examples during the demo. Explain why each rule triggered and show evidence instead of presenting scores as certainty.

## License

Add a license file if your team chooses a license for public reuse.
