import { useEffect, useState } from "react";
import { Network, ShieldAlert, Info, RefreshCw } from "lucide-react";
import api from "../services/api";
import ThreatGraph from "../components/ThreatGraph";
import ThreatTable from "../components/ThreatTable";

export default function ThreatIntelligence() {
  const [threats,setThreats] = useState([]);
  const [error,setError] = useState("");
  const load = () => Promise.all([api.get("/threats"),api.get("/graph")]).then(([t])=>setThreats(t.data)).catch(()=>setError("Could not connect to the backend."));
  useEffect(()=>{load();},[]);
  return <div className="page-stack">
    <section className="page-heading"><div><div className="eyebrow"><span className="eyebrow-line"/> RELATIONSHIP ANALYSIS</div><h1>Threat <span>Intelligence</span></h1><p>Explore relationships between sample assets and review the evidence associated with each indicator.</p></div><button className="button button-secondary" onClick={load}><RefreshCw size={16}/> Refresh</button></section>
    <div className="demo-banner"><div className="demo-banner-icon"><Info size={19}/></div><div><strong>Illustrative graph</strong><span>Connections shown are synthetic demo relationships, not findings about real people or organizations.</span></div></div>
    <section className="panel"><div className="panel-heading"><div><h2><Network size={18} className="inline-heading-icon"/> Connected asset graph</h2><p>Drag nodes, zoom, and select the connected entities.</p></div><span className="count-chip">{threats.length} indicators</span></div><ThreatGraph/></section>
    <section className="panel"><div className="panel-heading"><div><h2><ShieldAlert size={18} className="inline-heading-icon"/> Evidence register</h2><p>Scan results with severity and evidence summaries.</p></div></div>{error && <div className="alert alert-error">{error}</div>}<ThreatTable threats={threats}/></section>
  </div>;
}
