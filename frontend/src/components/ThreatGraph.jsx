import { useEffect, useState } from "react";
import { Background, Controls, MiniMap, ReactFlow } from "@xyflow/react";
import api from "../services/api";

export default function ThreatGraph({ compact = false }) {
  const [graph, setGraph] = useState({ nodes: [], edges: [] });
  const [error, setError] = useState("");
  useEffect(() => {
    api.get("/graph").then(r => setGraph(r.data)).catch(() => setError("Could not load graph data."));
  }, []);
  return <div className={`graph-wrap ${compact ? "graph-compact" : ""}`}>
    {error && <div className="inline-error">{error}</div>}
    <div className="graph-canvas">
      <ReactFlow nodes={graph.nodes} edges={graph.edges} fitView fitViewOptions={{ padding: 0.25 }} nodesDraggable={!compact} proOptions={{ hideAttribution: true }}>
        <Background color="#33332f" gap={20}/>
        <Controls showInteractive={!compact}/>
        {!compact && <MiniMap nodeColor={node => node.className?.includes("critical") ? "#ff5252" : node.className?.includes("high") ? "#ffb020" : "#ffd633"} maskColor="rgba(20,20,20,.6)"/>}
      </ReactFlow>
    </div>
    {graph.note && <p className="graph-disclaimer">{graph.note}</p>}
  </div>;
}
