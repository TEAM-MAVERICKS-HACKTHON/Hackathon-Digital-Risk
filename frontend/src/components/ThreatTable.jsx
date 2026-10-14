import { ExternalLink, ArrowUpRight } from "lucide-react";
import ScoreBadge from "./ScoreBadge";

export default function ThreatTable({ threats = [], compact = false }) {
  const list = compact ? threats.slice(0, 5) : threats;
  if (!list.length) return <div className="empty-state">No scans yet. Run a scan to see results here.</div>;
  return <div className="table-scroll"><table className="threat-table">
    <thead><tr><th>ASSET / INDICATOR</th><th>TYPE</th><th>RISK SCORE</th><th>STATUS</th><th>SCANNED</th></tr></thead>
    <tbody>{list.map(item => <tr key={item.id}>
      <td><div className="asset-cell"><div className={`asset-type-icon ${item.type.toLowerCase()}`}>{item.type === "Profile" ? "P" : item.type === "Link" ? "↗" : "A"}</div><div><strong>{item.asset}</strong><small>{item.id}</small></div></div></td>
      <td><span className="type-label">{item.type}</span></td>
      <td><div className="score-cell"><strong>{item.score}</strong><div className="mini-score-track"><span style={{width:`${item.score}%`}} className={`score-fill ${item.level?.toLowerCase()}`}/></div></div></td>
      <td><ScoreBadge score={item.score} level={item.level}/></td>
      <td><span className="time-cell">{new Date(item.scannedAt).toLocaleString()}</span></td>
    </tr>)}</tbody>
  </table></div>;
}
