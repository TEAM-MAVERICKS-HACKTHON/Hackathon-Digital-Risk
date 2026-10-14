function levelFor(score) {
  if (score >= 80) return "Critical";
  if (score >= 60) return "High";
  if (score >= 30) return "Medium";
  return "Low";
}

function finalizeResult({ type, asset, score, evidence, recommendations }) {
  const bounded = Math.max(0, Math.min(100, Math.round(score)));
  return {
    id: `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    type,
    asset,
    score: bounded,
    level: levelFor(bounded),
    evidence,
    recommendations,
    explanation: evidence.length
      ? `${evidence.length} signal(s) contributed to this heuristic score. Review the evidence before acting.`
      : "No configured warning signals were found by this basic prototype. This does not guarantee the asset is safe.",
    scannedAt: new Date().toISOString(),
    source: "ThreatNexus heuristic demo"
  };
}

module.exports = { levelFor, finalizeResult };
