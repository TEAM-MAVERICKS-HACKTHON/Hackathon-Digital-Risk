const { finalizeResult } = require("./riskScorer");

function scanProfile(input = {}) {
  const username = String(input.username || "").trim();
  const displayName = String(input.displayName || "").trim();
  const bio = String(input.bio || "").trim();
  const brand = String(input.brandName || "").trim();
  const profileUrl = String(input.profileUrl || "").trim();
  const evidence = [];
  let score = 5;

  if (!username && !displayName && !profileUrl) {
    const error = new Error("Provide at least a username, display name, or profile URL.");
    error.status = 400;
    throw error;
  }

  if (brand && displayName) {
    const a = displayName.toLowerCase().replace(/[^a-z0-9]/g, "");
    const b = brand.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (a && b && a.includes(b) && displayName.toLowerCase() !== brand.toLowerCase()) {
      score += 20;
      evidence.push({ signal: "Brand-like display name", points: 20, detail: `Display name resembles the supplied brand "${brand}".` });
    }
  }
  if (/(official|support|help|verify|claim|giveaway|airdrop|urgent)/i.test(`${username} ${displayName} ${bio}`)) {
    score += 18;
    evidence.push({ signal: "Potential impersonation language", points: 18, detail: "Profile text contains terms sometimes used in impersonation or social-engineering attempts." });
  }
  if (/(whatsapp|telegram|dm me|send password|otp|wallet connect|pay fee)/i.test(bio)) {
    score += 25;
    evidence.push({ signal: "High-risk bio wording", points: 25, detail: "Bio contains a request or redirect pattern that warrants manual review." });
  }
  if (/(.)\1{4,}/i.test(username)) {
    score += 10;
    evidence.push({ signal: "Unusual username pattern", points: 10, detail: "Repeated characters were found in the username." });
  }
  if (input.isVerified === false && brand) {
    score += 5;
    evidence.push({ signal: "Verification not confirmed", points: 5, detail: "The supplied record says verification is not confirmed; this is weak evidence and is not proof of fraud." });
  }
  if (input.accountAgeDays !== undefined && Number(input.accountAgeDays) >= 0 && Number(input.accountAgeDays) < 30) {
    score += 10;
    evidence.push({ signal: "Recently created account", points: 10, detail: "Reported account age is under 30 days; new accounts can be legitimate." });
  }

  return finalizeResult({
    type: "Profile",
    asset: profileUrl || `@${username || displayName}`,
    score,
    evidence,
    recommendations: score >= 60
      ? ["Compare against the brand's official profile", "Preserve screenshots and URLs", "Escalate for human review"]
      : ["Verify ownership through official brand channels", "Monitor for changes", "Do not report based on score alone"]
  });
}

module.exports = { scanProfile };
