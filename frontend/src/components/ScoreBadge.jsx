export default function ScoreBadge({ score = 0, level }) {
  const computed = level || (score >= 80 ? "Critical" : score >= 60 ? "High" : score >= 30 ? "Medium" : "Low");
  return <span className={`risk-badge risk-${computed.toLowerCase()}`}><span className="risk-dot"/>{computed}</span>;
}
