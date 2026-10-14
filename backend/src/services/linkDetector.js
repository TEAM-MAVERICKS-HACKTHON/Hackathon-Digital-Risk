const { finalizeResult } = require("./riskScorer");

function scanLink(input = {}) {
  const raw = String(input.url || "").trim();
  if (!raw) {
    const error = new Error("Provide a URL to analyze.");
    error.status = 400;
    throw error;
  }
  let parsed;
  try {
    parsed = new URL(raw.includes("://") ? raw : `https://${raw}`);
    if (!["http:", "https:"].includes(parsed.protocol)) throw new Error("Unsupported protocol");
  } catch {
    const error = new Error("Enter a valid HTTP or HTTPS URL.");
    error.status = 400;
    throw error;
  }

  const host = parsed.hostname.toLowerCase();
  const full = `${host}${parsed.pathname}${parsed.search}`.toLowerCase();
  const evidence = [];
  let score = 0;
  const add = (signal, points, detail) => { score += points; evidence.push({ signal, points, detail }); };

  if (parsed.protocol !== "https:") add("No HTTPS", 12, "The URL does not use HTTPS. HTTP alone does not prove maliciousness.");
  if (host.startsWith("xn--") || host.includes(".xn--")) add("Punycode hostname", 22, "Hostname contains an internationalized domain encoding that should be inspected for lookalikes.");
  if (/\d{1,3}(?:\.\d{1,3}){3}/.test(host)) add("IP address host", 18, "The host appears to be an IPv4 address rather than a conventional domain.");
  if ((host.match(/-/g) || []).length >= 3) add("Hyphen-heavy hostname", 12, "Hostname contains several hyphens, which can occur in deceptive lookalike domains.");
  if (/(login|verify|secure|account|update|wallet|payment|gift|prize|urgent|password|otp)/i.test(full)) add("Sensitive-action keywords", 18, "URL contains words often used in account or payment lures.");
  if (/(bit\.ly|tinyurl\.com|t\.co|is\.gd|cutt\.ly)$/i.test(host)) add("URL shortener", 10, "Shortened links hide the final destination and should be expanded safely before trusting.");
  if (parsed.hostname.split(".").length >= 5) add("Deep subdomain structure", 12, "The URL has a deep subdomain structure that can obscure the registrable domain.");
  if (parsed.username || parsed.password) add("Embedded URL credentials", 25, "URL includes user-info credentials before the host, a suspicious pattern.");

  return finalizeResult({
    type: "Link",
    asset: raw,
    score,
    evidence,
    recommendations: score >= 60
      ? ["Do not enter credentials or payment details", "Verify the registrable domain independently", "Check with an approved threat-intelligence source"]
      : ["Inspect the domain carefully before interacting", "Do not treat HTTPS as proof of legitimacy", "Verify the link through an official channel"]
  });
}

module.exports = { scanLink };
