import { useEffect, useState } from "react";
import { ShieldAlert, ScanSearch, Siren, Gauge, ArrowUpRight, RefreshCw, Activity, CircleHelp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import api from "../services/api";
import StatCard from "../components/StatCard";
import ThreatTable from "../components/ThreatTable";
import ThreatGraph from "../components/ThreatGraph";

const COLORS = ["#65d995", "#ffd633", "#ffb020", "#ff5252"];

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [trends, setTrends] = useState([]);
  const [threats, setThreats] = useState([]);
  const [error, setError] = useState("");
  const load = () => {
    setError("");
    Promise.all([api.get("/dashboard/summary"), api.get("/dashboard/trends"), api.get("/threats")])
      .then(([s,t,th]) => { setSummary(s.data); setTrends(t.data); setThreats(th.data); })
      .catch(() => setError("Backend connection failed. Start the backend and check VITE_API_URL."));
  };
  useEffect(() => { load(); }, []);
  const pieData = summary ? Object.entries(summary.byLevel).map(([name, value]) => ({name, value})) : [];
  return <div className="page-stack">
    <section className="page-heading">
      <div><div className="eyebrow"><span className="eyebrow-line"/> THREAT OVERVIEW</div><h1>Digital Risk <span>Dashboard</span></h1><p>See your brand’s risk posture, investigate suspicious assets, and connect the signals.</p></div>
      <button className="button button-secondary" onClick={load}><RefreshCw size={16}/> Refresh data</button>
    </section>
    {error && <div className="alert alert-error">{error}</div>}
    <div className="demo-banner"><div className="demo-banner-icon"><CircleHelp size={19}/></div><div><strong>Prototype data mode</strong><span>Sample incidents are simulated. Use the scanners to add your own heuristic scan results.</span></div><span className="demo-tag">DEMO</span></div>
    <section className="stats-grid">
      <StatCard icon={ScanSearch} label="Total scans recorded" value={summary?.totalScans ?? "—"} note="Demo + current session" tone="yellow"/>
      <StatCard icon={ShieldAlert} label="High-risk indicators" value={summary?.activeThreats ?? "—"} note="Score 60 and above" tone="red"/>
      <StatCard icon={Siren} label="Critical alerts" value={summary?.criticalAlerts ?? "—"} note="Requires urgent review" tone="orange"/>
      <StatCard icon={Gauge} label="Average risk score" value={summary ? `${summary.averageRisk}/100` : "—"} note="Across recorded indicators" tone="green"/>
    </section>
    <section className="charts-grid">
      <article className="panel chart-panel"><div className="panel-heading"><div><h2>Detection activity</h2><p>Illustrative weekly scan volumes</p></div><span className="panel-icon"><Activity size={18}/></span></div>
        <div className="chart-legend"><span><i className="legend-yellow"/>Profiles</span><span><i className="legend-purple"/>Links</span><span><i className="legend-green"/>Apps</span></div>
        <div className="area-chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={trends} margin={{top:10,right:8,left:-22,bottom:0}}><defs><linearGradient id="profilesFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ffd633" stopOpacity={0.24}/><stop offset="100%" stopColor="#ffd633" stopOpacity={0}/></linearGradient></defs><CartesianGrid stroke="#30302c" strokeDasharray="4 4" vertical={false}/><XAxis dataKey="day" stroke="#77776e" tickLine={false} axisLine={false}/><YAxis stroke="#77776e" tickLine={false} axisLine={false}/><Tooltip contentStyle={{background:"#20201d",border:"1px solid #41413a",borderRadius:10,color:"#fff6df"}}/><Area type="monotone" dataKey="profiles" stroke="#ffd633" fill="url(#profilesFill)" strokeWidth={2.4}/><Area type="monotone" dataKey="links" stroke="#a78bfa" fill="transparent" strokeWidth={2}/><Area type="monotone" dataKey="apps" stroke="#65d995" fill="transparent" strokeWidth={2}/></AreaChart></ResponsiveContainer></div>
      </article>
      <article className="panel chart-panel risk-distribution"><div className="panel-heading"><div><h2>Risk distribution</h2><p>Recorded indicators by severity</p></div><span className="panel-icon"><Gauge size={18}/></span></div>
        <div className="donut-wrap"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={pieData} dataKey="value" nameKey="name" innerRadius={63} outerRadius={88} paddingAngle={4} stroke="none">{pieData.map((entry,index)=><Cell key={entry.name} fill={COLORS[index]}/>)}</Pie><Tooltip contentStyle={{background:"#20201d",border:"1px solid #41413a",borderRadius:10}}/></PieChart></ResponsiveContainer><div className="donut-center"><strong>{summary?.totalScans ?? "—"}</strong><span>Indicators</span></div></div>
        <div className="risk-legend">{pieData.map((item,i)=><div key={item.name}><span><i style={{background:COLORS[i]}}/>{item.name}</span><strong>{item.value}</strong></div>)}</div>
      </article>
    </section>
    <section className="panel"><div className="panel-heading"><div><h2>Threat network preview</h2><p>Example relationships between suspicious digital assets</p></div><a className="text-link" href="/intelligence">Explore graph <ArrowUpRight size={15}/></a></div><ThreatGraph compact/></section>
    <section className="panel"><div className="panel-heading"><div><h2>Recent indicators</h2><p>Latest recorded scan results and risk classifications</p></div><span className="count-chip">{threats.length} records</span></div><ThreatTable threats={threats} compact/></section>
    <p className="fine-print">Risk scores are heuristic indicators, not proof of malicious activity. Verify evidence before taking action.</p>
  </div>;
}
