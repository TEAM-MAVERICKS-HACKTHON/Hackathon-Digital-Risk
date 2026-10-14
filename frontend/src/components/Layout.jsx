import { NavLink, Outlet } from "react-router-dom";
import { Activity, ShieldCheck, LayoutDashboard, Users, Link2, Smartphone, Network, Menu, Bell } from "lucide-react";
import { useState } from "react";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/profiles", label: "Profile detection", icon: Users },
  { to: "/links", label: "Link detection", icon: Link2 },
  { to: "/apps", label: "App detection", icon: Smartphone },
  { to: "/intelligence", label: "Threat intelligence", icon: Network }
];

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return <div className="app-shell">
    <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
      <div className="brand-lockup">
        <div className="brand-mark"><ShieldCheck size={23}/></div>
        <div><div className="brand-name">Threat<span>Nexus</span></div><div className="brand-tagline">DETECT. CONNECT. PROTECT.</div></div>
      </div>
      <div className="workspace-label">WORKSPACE</div>
      <nav className="nav-list">
        {nav.map(item => {
          const Icon = item.icon;
          return <NavLink key={item.to} to={item.to} end={item.end} onClick={() => setMobileOpen(false)} className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}>
            <Icon size={18}/><span>{item.label}</span>{item.label === "Threat intelligence" && <span className="nav-live-dot"/>}
          </NavLink>;
        })}
      </nav>
      <div className="sidebar-bottom">
        <div className="security-card"><div className="security-icon"><Activity size={17}/></div><div><strong>Protection active</strong><small>Demo analysis engine</small></div><span className="status-dot"/></div>
        <div className="user-mini"><div className="avatar">TN</div><div><strong>Security analyst</strong><small>Demo workspace</small></div><span className="user-menu">•••</span></div>
      </div>
    </aside>
    {mobileOpen && <button className="mobile-overlay" aria-label="Close menu" onClick={() => setMobileOpen(false)}/>}
    <main className="main-area">
      <header className="topbar">
        <button className="mobile-menu icon-button" onClick={() => setMobileOpen(v => !v)} aria-label="Open menu"><Menu size={20}/></button>
        <div className="breadcrumb"><span>Workspace</span><span className="crumb-sep">/</span><strong>Digital Risk Protection</strong></div>
        <div className="topbar-right"><span className="environment-pill"><span className="status-dot"/> DEMO ENVIRONMENT</span><button className="icon-button notification-button" aria-label="Notifications"><Bell size={18}/><i/></button><div className="top-avatar">SA</div></div>
      </header>
      <div className="page-content"><Outlet/></div>
      <footer className="footer"><span>© 2026 ThreatNexus</span><span><span className="status-dot"/> Heuristic analysis engine · Human review required</span></footer>
    </main>
  </div>;
}
