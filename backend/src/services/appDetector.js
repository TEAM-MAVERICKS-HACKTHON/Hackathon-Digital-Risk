const { finalizeResult } = require("./riskScorer");

function scanApp(input = {}) {
  const appName = String(input.appName || "").trim();
  const brandName = String(input.brandName || "").trim();
  const publisher = String(input.publisher || "").trim();
  const officialPublisher = String(input.officialPublisher || "").trim();
  const packageName = String(input.packageName || "").trim();
  const source = String(input.source || "").trim();
  const permissions = Array.isArray(input.permissions) ? input.permissions.map(String) : [];
  if (!appName) {
    const error = new Error("Provide an application name.");
    error.status = 400;
    throw error;
  }

  const evidence = [];
  let score = 5;
  const add = (signal, points, detail) => { score += points; evidence.push({ signal, points, detail }); };

  if (brandName) {
    const n = appName.toLowerCase().replace(/[^a-z0-9]/g, "");
    const b = brandName.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (n.includes(b) && n !== b) add("Brand-like app name", 18, `App name resembles "${brandName}" but is not an exact normalized match.`);
  }
  if (officialPublisher && publisher && publisher.toLowerCase() !== officialPublisher.toLowerCase()) {
    add("Publisher mismatch", 30, "Publisher does not match the supplied official publisher reference.");
  }
  if (source && !/(google play|apple app store|official store)/i.test(source)) {
    add("Unverified distribution source", 15, "The supplied source is not identified as a major official app store.");
  }
  if (/(accessibility|sms|contacts|device admin|notification listener|install packages|read messages)/i.test(permissions.join(" "))) {
    add("Sensitive permissions", 20, "One or more permissions can be sensitive; validate whether they are required for the app's purpose.");
  }
  if (packageName && !/^[a-zA-Z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*){1,}$/.test(packageName)) {
    add("Unusual package identifier", 12, "Package identifier does not match a common reverse-domain pattern.");
  }

  return finalizeResult({
    type: "Application",
    asset: `${appName}${packageName ? ` (${packageName})` : ""}`,
    score,
    evidence,
    recommendations: score >= 60
      ? ["Compare publisher and package ID against the official listing", "Avoid installing until reviewed", "Capture listing URL and app metadata"]
      : ["Verify the publisher on the official store", "Review permissions in context", "Compare the package ID with official documentation"]
  });
}

module.exports = { scanApp };
