const threats = [
  {
    id: "demo-profile-1", type: "Profile", asset: "@brand_support_claims",
    score: 86, level: "Critical", status: "Needs review",
    evidence: [
      { signal: "Brand-like display name", points: 20, detail: "Display name resembles the configured brand." },
      { signal: "Potential impersonation language", points: 18, detail: "Profile uses support and claim wording." },
      { signal: "High-risk bio wording", points: 25, detail: "Bio requests users to continue through a messaging channel." }
    ],
    recommendations: ["Verify the profile against official brand channels", "Preserve evidence", "Escalate for human review"],
    scannedAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    source: "Simulated demo incident"
  },
  {
    id: "demo-link-1", type: "Link", asset: "https://example-login-security.invalid/verify",
    score: 72, level: "High", status: "Needs review",
    evidence: [{ signal: "Sensitive-action keywords", points: 18, detail: "URL includes login and verification wording." }],
    recommendations: ["Verify the registrable domain", "Do not enter credentials"],
    scannedAt: new Date(Date.now() - 1000 * 60 * 47).toISOString(),
    source: "Simulated demo incident"
  },
  {
    id: "demo-app-1", type: "Application", asset: "Brand Wallet Helper (com.example.brandhelper)",
    score: 64, level: "High", status: "Needs review",
    evidence: [{ signal: "Publisher mismatch", points: 30, detail: "Publisher differs from the configured official publisher." }],
    recommendations: ["Compare publisher and package ID with the official listing"],
    scannedAt: new Date(Date.now() - 1000 * 60 * 95).toISOString(),
    source: "Simulated demo incident"
  },
  {
    id: "demo-profile-2", type: "Profile", asset: "@brand_news_updates",
    score: 42, level: "Medium", status: "Monitoring",
    evidence: [{ signal: "Brand-like display name", points: 20, detail: "Name resembles the brand." }],
    recommendations: ["Verify ownership", "Monitor for changes"],
    scannedAt: new Date(Date.now() - 1000 * 60 * 160).toISOString(),
    source: "Simulated demo incident"
  },
  {
    id: "demo-link-2", type: "Link", asset: "https://www.example.org/help",
    score: 12, level: "Low", status: "Monitoring",
    evidence: [{ signal: "No major configured signals", points: 0, detail: "This demo item is included to illustrate low-risk handling." }],
    recommendations: ["Continue routine monitoring"],
    scannedAt: new Date(Date.now() - 1000 * 60 * 220).toISOString(),
    source: "Simulated demo incident"
  }
];

const graph = {
  nodes: [
    { id: "brand", type: "default", position: { x: 330, y: 35 }, data: { label: "Official Brand" }, className: "node-brand" },
    { id: "profile1", position: { x: 40, y: 190 }, data: { label: "Suspicious Profile" }, className: "node-high" },
    { id: "domain1", position: { x: 300, y: 250 }, data: { label: "Lookalike Domain" }, className: "node-critical" },
    { id: "app1", position: { x: 540, y: 185 }, data: { label: "Unverified App" }, className: "node-high" },
    { id: "profile2", position: { x: 80, y: 370 }, data: { label: "Related Account" }, className: "node-medium" }
  ],
  edges: [
    { id: "e1", source: "brand", target: "profile1", label: "name similarity", animated: true },
    { id: "e2", source: "profile1", target: "domain1", label: "shared URL", animated: true },
    { id: "e3", source: "domain1", target: "app1", label: "shared campaign", animated: false },
    { id: "e4", source: "profile1", target: "profile2", label: "shared identifier", animated: false }
  ],
  note: "Synthetic relationships for demonstration only; replace with evidence-backed relationships from real investigations."
};

module.exports = { threats, graph };
