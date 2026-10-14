# ThreatNexus — AI-Powered Digital Risk Protection Platform

**Team Name:** THE MAVERICKS  
**Team Unique ID:** XL0939

## 🚀 Project Overview

ThreatNexus is a digital risk protection platform designed to help identify potentially fake profiles, suspicious links, and risky applications through a unified interface. It aims to make digital threat assessment easier by analyzing available information, presenting risk scores, and visualizing results through a centralized dashboard.

The platform combines profile analysis, URL risk assessment, and application information analysis to help users recognize potential digital threats and prioritize further investigation.

## 🔗 Live Deployment

- **Frontend:** https://hackathon-digital-risk.onrender.com
- **Backend:** https://threatnexus-backend.onrender.com

## 🎯 Problem Statement

The rapid growth of online platforms has increased the risks associated with fake identities, phishing links, fraudulent applications, impersonation, and other forms of digital deception. These threats can result in financial loss, identity theft, privacy violations, and unauthorized access to personal information.

Traditional threat-checking methods may require users to switch between different services, making it difficult to assess multiple forms of digital risk efficiently.

**Our challenge is to develop a centralized platform that helps users evaluate suspicious profiles, links, and applications and presents understandable risk indicators to support safer digital decisions.**

## 💡 Our Solution Approach

ThreatNexus provides a unified digital risk assessment workflow with three main detection modules.

### 1. Fake Profile Detection
Evaluates available profile information and configured indicators to identify potentially suspicious or impersonating accounts. Depending on the implemented checks, indicators may include username and display-name inconsistencies, profile completeness, account age, and suspicious patterns.

### 2. Suspicious Link Detection
Analyzes submitted URLs for configured warning signs, such as unusual URL structures, suspicious keywords, misleading domain patterns, and other potentially unsafe characteristics.

### 3. Suspicious Application Detection
Reviews available application information and configured risk indicators to flag applications that may require additional investigation.

### 4. Risk Scoring
Uses configured indicators to produce a risk score or risk category, helping users prioritize items for review. Scores should not be interpreted as verified probabilities of malicious activity unless calibrated and validated for that purpose.

### 5. Interactive Dashboard
Provides a centralized interface for viewing assessments, risk levels, and graphical summaries, making results easier to understand.

## ✨ Key Features

- Centralized digital risk assessment dashboard
- Fake profile and impersonation assessment
- Suspicious URL and link analysis
- Suspicious application assessment
- Risk scores and risk-level indicators
- Graphical representation of assessment results
- Interactive React-based user interface
- Node.js and Express.js backend
- Separate frontend and backend deployment on Render

*Available features and checks depend on the current implementation.*

## 🛠️ Technology Stack

| Component | Technologies |
|---|---|
| Frontend framework | React.js |
| Frontend languages | HTML5, CSS3, JavaScript |
| Backend runtime | Node.js |
| Backend framework | Express.js |
| API communication | HTTP/HTTPS and JSON |
| API architecture | REST-style endpoints, as configured |
| Deployment | Render |
| Version control | Git |
| Source code hosting | GitHub |

## 🧠 Models and Algorithms

The exact models and algorithms must match the implementation in the source code.

### Feature-Based Analysis
Examines available characteristics of profiles, URLs, and application information to identify potential warning signs.

### Rule-Based and Heuristic Detection
Uses predefined conditions, patterns, or thresholds to identify suspicious characteristics when these checks are implemented in the backend.

### Risk Scoring and Classification
Combines configured indicators into a score or category, such as Low, Medium, or High, if supported by the implementation. The scoring weights and thresholds should match the actual code.

### Data Visualization
Uses charts or graphical summaries to present risk assessment results. Visualization supports interpretation; it is not itself a detection algorithm.

**Machine learning note:** Do not claim a trained model or a specific algorithm such as Random Forest, SVM, or XGBoost unless it is actually implemented and evaluated in the project.

## 🏗️ System Architecture

The application follows a frontend-backend architecture.

1. **User Interface:** The user opens the React frontend and selects a detection module.
2. **Input Collection:** The user supplies the profile, URL, or application information required by the module.
3. **API Request:** The frontend sends a request to the backend over HTTP/HTTPS.
4. **Risk Assessment:** The backend executes the configured validation, detection, and scoring logic.
5. **API Response:** The backend returns assessment results in the format supported by the API.
6. **Dashboard Visualization:** The frontend presents the returned score, risk indicators, and available visual summaries.

## 👥 Team Members and Roles

**Team Name:** THE MAVERICKS  
**Team Unique ID:** XL0939

Our team collaborated to design, develop, integrate, and deploy ThreatNexus. Each team member contributed to a specific area of the project.

| Team Member | Role | Responsibilities |
|---|---|---|
| **Bella Gnana Charmika** | Team Leader & UI/Frontend Designer | Led team coordination and project development. Designed and developed the user interface, dashboard layout, responsive pages, and user interactions using React.js, HTML, CSS, and JavaScript. |
| **Naga Harshitha** | Backend Designer & API Integration | Worked on backend development, API integration, and database connectivity. Contributed to connecting frontend requests with backend services and supporting data processing. |
| **S. V. Sai Teja** | Version Control & GitHub Manager | Managed source code using Git and GitHub, supported repository organization, coordinated code updates, and helped maintain the team's collaborative development workflow. |
| **Raja Nayak** | Deployment & Integration Engineer | Managed frontend and backend deployment on Render, configured deployment settings, and worked on connecting the deployed frontend with the backend service. |

### Team Collaboration

The team followed a collaborative development approach in which frontend design, backend implementation, API integration, version control, and deployment were handled as coordinated workstreams. This helped bring the individual components together into a single digital risk protection platform.

## 🔌 API and Backend Integration

**Backend base URL:**

https://threatnexus-backend.onrender.com

The frontend should use this base URL when communicating with the deployed backend.

For a Vite-based frontend, an environment variable may look like:

```env
VITE_API_BASE_URL=https://threatnexus-backend.onrender.com
```

Use the environment variable name expected by your actual frontend build configuration. If the project uses Create React App, the convention is commonly `REACT_APP_API_BASE_URL`.

Use the actual routes and HTTP methods defined in the backend source code. Endpoint paths are not listed here because they have not been independently verified.

### Integration Requirements

- Configure the frontend to call the deployed backend URL.
- Configure backend CORS to allow the deployed frontend origin.
- Ensure the backend listens on the port provided by Render.
- Check browser developer tools and backend logs for failed requests.
- Rebuild and redeploy the frontend after changing build-time environment variables.

## 📁 Project Structure

A typical high-level structure is:

```text
ThreatNexus/
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
├── backend/
│   ├── package.json
│   ├── server.js
│   └── ...
└── README.md
```

The exact structure may differ depending on the files in the repository.

## 💻 Installation and Local Setup

### Prerequisites

- Node.js and npm
- Git
- A local copy of the project repository

### Step 1: Clone the Repository

Replace the placeholders with your actual GitHub repository URL and project folder name.

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd <YOUR_PROJECT_FOLDER>
```

### Step 2: Start the Backend

```bash
cd backend
npm install
npm start
```

Use the development script provided by your backend's `package.json` if `npm start` is not defined.

### Step 3: Start the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Use the frontend start script defined in its `package.json` if it differs.

### Step 4: Configure the API URL

For local testing, configure the frontend to call your locally running backend. For the deployed application, use the Render backend URL listed above.

## ☁️ Deployment

The project is deployed on Render as separate frontend and backend services.

- **Frontend service:** https://hackathon-digital-risk.onrender.com
- **Backend service:** https://threatnexus-backend.onrender.com

Deployment checklist:

1. Confirm that the frontend builds successfully.
2. Confirm that the backend starts successfully.
3. Verify the frontend API base URL.
4. Verify backend CORS settings.
5. Test each detection module using appropriate sample inputs.
6. Review service logs and browser console errors if requests fail.

## 🧪 Testing and Evaluation

Recommended validation includes:

- Testing profile inputs with different characteristics.
- Testing normal, malformed, and suspicious-looking URLs.
- Testing application inputs with complete and incomplete information.
- Verifying that frontend requests reach the backend.
- Checking that scores, labels, and charts match the API response.
- Recording false positives, false negatives, and known limitations.

Accuracy, precision, recall, F1-score, and similar metrics should be reported only after evaluation on a suitable labeled dataset.

## 🔐 Security and Responsible Use

- Use the platform only to review information you are authorized to analyze.
- Do not submit passwords, private access tokens, or unnecessary sensitive information.
- Treat risk scores as indicators for further review, not definitive proof of malicious activity.
- Verify suspicious findings through trusted sources before taking action.
- Protect API endpoints and avoid exposing secrets in frontend code or public repositories.

## 🔮 Future Enhancements

- Integrate trusted threat-intelligence and domain-reputation services.
- Introduce trained machine-learning models using appropriately labeled datasets.
- Add explainable risk indicators for each assessment.
- Evaluate and calibrate scoring thresholds.
- Improve API documentation and automated testing.
- Add case history, reporting, and analyst feedback.
- Expand monitoring and alerting capabilities.

## 📌 Conclusion

ThreatNexus aims to bring fake-profile assessment, suspicious-link analysis, and application-risk assessment into one platform. By combining configured detection logic, risk scoring, and dashboard visualization, it helps users organize digital risk checks and prioritize further investigation.

---

**Built by THE MAVERICKS | Team ID: XL0939**
