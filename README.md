# ThreatNexus — AI-Powered Digital Risk Protection Platform

**Team Name:** THE MAVERICKS  
**Team Unique ID:** XL0939

## 🚀 Project Overview

ThreatNexus is a digital risk protection platform designed to help identify potentially fake profiles, suspicious links, and risky applications through a unified interface. It aims to make digital threat assessment easier by analyzing available information, presenting risk scores, and visualizing results through a centralized dashboard.

The platform combines profile analysis, URL risk assessment, and application information analysis to help users recognize potential digital threats and prioritize further investigation.

## 🔗 Live Deployment

- **Frontend:** https://hackathon-digital-risk.onrender.com
- **Backend API:** https://threatnexus-backend.onrender.com

## 🎯 Problem Statement

The rapid growth of online platforms has increased the risks associated with fake identities, phishing links, fraudulent applications, impersonation, and other forms of digital deception. These threats can result in financial loss, identity theft, privacy violations, and unauthorized access to personal information.

Existing checks may be scattered across different services, making it difficult for users to evaluate different types of digital risks in one place.

**Our challenge is to develop a centralized, accessible platform that evaluates suspicious profiles, links, and applications and presents understandable risk indicators to support safer digital decisions.**

## 💡 Our Solution Approach

ThreatNexus provides a unified digital risk assessment workflow with three main detection modules:

### 1. Fake Profile Detection
Evaluates available profile information and configured indicators to identify potentially suspicious or impersonating accounts. Depending on the implemented checks, these indicators may include username and display-name inconsistencies, profile completeness, account age, and other suspicious patterns.

### 2. Suspicious Link Detection
Analyzes submitted URLs for configured warning signs, such as unusual URL structures, suspicious keywords, misleading domain patterns, or other potentially unsafe characteristics.

### 3. Suspicious Application Detection
Reviews available application information and configured risk indicators to flag applications that may require additional investigation.

### 4. Risk Scoring
Uses the indicators supported by the implementation to produce a risk score or risk category. This helps users prioritize items for review. The score should not be interpreted as a verified probability of malicious activity unless it has been calibrated and validated for that purpose.

### 5. Interactive Dashboard
Provides a centralized interface for viewing assessments, risk levels, and graphical summaries, making the results easier to understand.

## ✨ Key Features

- Centralized digital risk assessment dashboard
- Fake profile and impersonation assessment
- Suspicious URL and link analysis
- Suspicious application assessment
- Risk scores and risk-level indicators
- Graphical representation of assessment results
- React-based user interface
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

The platform's exact algorithms and models must match the implementation in the source code. The following are the relevant approaches for the project's detection workflow.

### Feature-Based Analysis
Examines available characteristics of profiles, URLs, and application information to identify potential warning signs.

### Rule-Based and Heuristic Detection
Uses predefined conditions, patterns, or thresholds to identify suspicious characteristics when these checks are implemented in the backend.

### Risk Scoring and Classification
Combines configured indicators into a score or category, such as Low, Medium, or High, if supported by the implementation. The weights and thresholds should be documented according to the actual code.

### Data Visualization
Uses charts or graphical summaries to present risk assessment results. Visualization supports interpretation; it is not itself a detection algorithm.

**Machine learning note:** Do not claim a trained model, neural network, or specific algorithm such as Random Forest, SVM, or XGBoost unless the project actually implements it. A future enhancement could introduce a trained classifier evaluated on a labeled dataset.

## 🏗️ System Architecture

The application follows a frontend-backend architecture.

1. **User Interface:** The user opens the React frontend and selects a detection module.
2. **Input Collection:** The user supplies the profile, URL, or application information required by that module.
3. **API Request:** The frontend sends the request to the backend over HTTP/HTTPS.
4. **Risk Assessment:** The backend executes the configured validation, detection, and scoring logic.
5. **API Response:** The backend returns the assessment results in the response format supported by the API.
6. **Dashboard Visualization:** The frontend presents the returned score, risk indicators, and available visual summaries.

## 🔌 API and Backend Integration

**Backend base URL:**

https://threatnexus-backend.onrender.com

The frontend should use this base URL when communicating with the deployed backend.

For a Vite-based frontend, an environment variable may look like:

```env
VITE_API_BASE_URL=https://threatnexus-backend.onrender.com
```

Use the environment variable name expected by your actual frontend build configuration. If the project uses Create React App, the convention is commonly `REACT_APP_API_BASE_URL`.

API requests should use the actual routes and HTTP methods defined in the backend source code. Endpoint paths are intentionally not guessed here.

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

Replace the example repository URL with the actual GitHub repository URL.

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd <YOUR_PROJECT_FOLDER>
```

### Step 2: Start the Backend

Open a terminal:

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

For local testing, configure the frontend to call your locally running backend. For the deployed application, use the Render backend URL shown above.

## ☁️ Deployment

The project is deployed on Render as separate frontend and backend services.

- **Frontend service:** https://hackathon-digital-risk.onrender.com
- **Backend service:** https://threatnexus-backend.onrender.com

For reliable deployment:

1. Confirm the frontend service builds successfully.
2. Confirm the backend service starts successfully.
3. Verify the frontend API base URL.
4. Verify backend CORS settings.
5. Test each detection module using valid and suspicious-looking sample inputs.
6. Review service logs and browser console errors if a request fails.

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

## 👥 Team Information

- **Team Name:** THE MAVERICKS
- **Team Unique ID:** XL0939
- **Project:** ThreatNexus — Digital Risk Protection Platform

## 📌 Conclusion

ThreatNexus aims to bring fake-profile assessment, suspicious-link analysis, and application-risk assessment into one platform. By combining configured detection logic, risk scoring, and dashboard visualization, it helps users organize digital risk checks and prioritize further investigation.

---

**Built by THE MAVERICKS | Team ID: XL0939**
