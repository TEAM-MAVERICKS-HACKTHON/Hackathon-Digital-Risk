import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ScannerPage from "./pages/ScannerPage";
import ThreatIntelligence from "./pages/ThreatIntelligence";

export default function App() {
  return <Routes><Route element={<Layout/>}>
    <Route path="/" element={<Dashboard/>}/>
    <Route path="/profiles" element={<ScannerPage type="profiles"/>}/>
    <Route path="/links" element={<ScannerPage type="links"/>}/>
    <Route path="/apps" element={<ScannerPage type="apps"/>}/>
    <Route path="/intelligence" element={<ThreatIntelligence/>}/>
    <Route path="*" element={<Dashboard/>}/>
  </Route></Routes>;
}
