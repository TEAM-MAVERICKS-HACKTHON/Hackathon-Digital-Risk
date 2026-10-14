import { useState } from "react";
import { AlertTriangle, CheckCircle2, ScanSearch, LoaderCircle, ShieldCheck } from "lucide-react";
import api from "../services/api";
import ScoreBadge from "../components/ScoreBadge";

const configs = {
  profiles: {
    title: "Fake Profile Detection", eyebrow: "SOCIAL MEDIA MONITORING",
    description: "Review profile metadata for potential brand impersonation and social-engineering signals.",
    endpoint: "/profiles/scan", button: "Analyze profile",
    fields: [
      ["brandName","Official brand name","text","e.g. Acme Bank"],
      ["username","Username / handle","text","e.g. acme_support_claims"],
      ["displayName","Display name","text","e.g. Acme Bank Official"],
      ["profileUrl","Profile URL (optional)","url","https://example.com/profile"],
      ["bio","Profile biography","textarea","Paste the public profile bio"],
      ["accountAgeDays","Account age in days (optional)","number","e.g. 12"]
    ]
  },
  links: {
    title: "Suspicious Link Detection", eyebrow: "URL & DOMAIN INTELLIGENCE",
    description: "Analyze URL structure and flag patterns that can appear in phishing or brand impersonation links.",
    endpoint: "/links/scan", button: "Analyze URL",
    fields: [["url","URL to inspect","url","https://example.com/login"],["brandName","Brand to protect (optional)","text","e.g. Acme Bank"]]
  },
  apps: {
    title: "Fake Application Detection", eyebrow: "APP STORE MONITORING",
    description: "Compare application identity and publisher metadata against an official brand reference.",
    endpoint: "/apps/scan", button: "Analyze application",
    fields: [
      ["appName","Application name","text","e.g. Acme Wallet Pro"],
      ["brandName","Official brand name","text","e.g. Acme Wallet"],
      ["publisher","Listed publisher","text","e.g. Example Developer LLC"],
      ["officialPublisher","Official publisher reference","text","e.g. Acme Technologies"],
      ["packageName","Package identifier (optional)","text","com.example.acmewallet"],
      ["source","Distribution source (optional)","text","e.g. Third-party website"],
      ["permissions","Permissions (comma-separated)","text","SMS, Accessibility, Contacts"]
    ]
  }
};

export default function ScannerPage({ type }) {
  const config = configs[type];
  const [values, setValues] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const update = (key,value) => setValues(prev => ({...prev,[key]:value}));
  const submit = async (e) => {
    e.preventDefault(); setLoading(true); setError(""); setResult(null);
    const payload = {...values};
    if (type === "profiles" && payload.accountAgeDays !== undefined && payload.accountAgeDays !== "") payload.accountAgeDays = Number(payload.accountAgeDays);
    if (type === "apps") payload.permissions = (payload.permissions || "").split(",").map(s => s.trim()).filter(Boolean);
    Object.keys(payload).forEach(key => { if (payload[key] === "") delete payload[key]; });
    try { const response = await api.post(config.endpoint, payload); setResult(response.data); }
    catch (err) { setError(err.response?.data?.message || err.response?.data?.error || "Could not complete scan. Check the backend connection and input."); }
    finally { setLoading(false); }
  };
  const examples = {
    profiles: {brandName:"Acme Bank",username:"acme_support_claims",displayName:"Acme Bank Official",profileUrl:"https://social.example/acme_support_claims",bio:"Urgent account verification. DM us to claim your reward.",accountAgeDays:"8"},
    links: {url:"https://paypal-security.example.invalid/login/verify",brandName:"PayPal"},
    apps: {appName:"Acme Wallet Helper",brandName:"Acme Wallet",publisher:"Example Developer",officialPublisher:"Acme Technologies",packageName:"com.example.acmewallet",source:"Third-party website",permissions:"SMS, Accessibility, Contacts"}
  };
  return <div className="page-stack">
    <section className="page-heading"><div><div className="eyebrow"><span className="eyebrow-line"/> {config.eyebrow}</div><h1>{config.title.split(" ").slice(0,-1).join(" ")} <span>{config.title.split(" ").slice(-1)}</span></h1><p>{config.description}</p></div><div className="heading-shield"><ShieldCheck size={26}/></div></section>
    <div className="scanner-layout">
      <section className="panel scanner-panel"><div className="panel-heading"><div><h2>Asset details</h2><p>Enter only information you are authorized to review.</p></div><span className="panel-icon"><ScanSearch size={18}/></span></div>
        <form onSubmit={submit} className="scan-form">
          {config.fields.map(([key,label,kind,placeholder]) => <label className={`form-field ${kind === "textarea" ? "full-field" : ""}`} key={key}><span>{label}</span>{kind === "textarea" ? <textarea rows="4" value={values[key] || ""} onChange={e=>update(key,e.target.value)} placeholder={placeholder}/> : <input type={kind} min={kind === "number" ? "0" : undefined} value={values[key] || ""} onChange={e=>update(key,e.target.value)} placeholder={placeholder} required={["url"].includes(kind) && key === "url" || ["username","appName"].includes(key)}/>}</label>)}
          <div className="form-actions"><button type="submit" className="button button-primary" disabled={loading}>{loading ? <LoaderCircle size={17} className="spin"/> : <ScanSearch size={17}/>} {loading ? "Analyzing..." : config.button}</button><button type="button" className="button button-secondary" onClick={()=>setValues(examples[type])}>Load demo input</button></div>
        </form>
        {error && <div className="alert alert-error"><AlertTriangle size={18}/>{error}</div>}
      </section>
      <section className="panel result-panel"><div className="panel-heading"><div><h2>Analysis result</h2><p>Risk score and explainable signals</p></div><span className="panel-icon"><ActivityIcon/></span></div>
        {!result ? <div className="result-empty"><div className="empty-shield"><ShieldCheck size={30}/></div><strong>Ready to analyze</strong><p>Submit an asset to see its risk score, triggered signals, and suggested next steps.</p><div className="empty-note"><AlertTriangle size={15}/> Results are heuristic, not a final verdict.</div></div> :
          <div className="result-content"><div className="result-score-row"><div><span className="result-overline">RISK SCORE</span><div className="result-score">{result.score}<span>/100</span></div></div><ScoreBadge score={result.score} level={result.level}/></div>
            <div className="large-score-track"><span className={`score-fill ${result.level.toLowerCase()}`} style={{width:`${result.score}%`}}/></div>
            <div className="result-asset"><span>ANALYZED ASSET</span><strong>{result.asset}</strong></div>
            <div className="section-label">TRIGGERED SIGNALS <span>{result.evidence.length}</span></div>
            {result.evidence.length ? <div className="evidence-list">{result.evidence.map((item,i)=><div className="evidence-item" key={`${item.signal}-${i}`}><div className="evidence-icon"><AlertTriangle size={15}/></div><div><strong>{item.signal}</strong><p>{item.detail}</p></div><span className="points">+{item.points}</span></div>)}</div> : <div className="no-signals"><CheckCircle2 size={17}/> No configured warning signals found.</div>}
            <div className="section-label">RECOMMENDED NEXT STEPS</div><ul className="recommendations">{result.recommendations.map((item,i)=><li key={i}>{item}</li>)}</ul>
            <p className="result-disclaimer">{result.explanation} Human verification is required.</p>
          </div>}
      </section>
    </div>
  </div>;
}
function ActivityIcon() { return <ScanSearch size={18}/>; }
