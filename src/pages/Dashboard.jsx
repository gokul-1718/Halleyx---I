import React, { useState, useEffect } from "react";

export default function Dashboard() {
  const [workflowCount, setWorkflowCount] = useState(1);

  useEffect(() => {
    const saved = localStorage.getItem("mockWorkflows");
    if (saved) {
      const parsedWorkflows = JSON.parse(saved);
      setWorkflowCount(parsedWorkflows.length);
    }
  }, []);

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: "800", background: "-webkit-linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: "0 0 10px 0" }}>
          System Dashboard
        </h1>
        <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>Real-time overview of your automated operations</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "30px" }}>
        {/* Workflow Count Card */}
        <div style={{ background: "white", padding: "40px 30px", borderRadius: "24px", boxShadow: "0 20px 40px rgba(0,0,0,0.04)", border: "1px solid #f1f5f9", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transition: "transform 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform="translateY(-5px)"} onMouseLeave={e => e.currentTarget.style.transform="translateY(0)"}>
          <div style={{ width: "70px", height: "70px", borderRadius: "20px", background: "#e0e7ff", color: "#4f46e5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem", marginBottom: "20px" }}>
            ⚡
          </div>
          <h3 style={{ margin: "0 0 10px 0", color: "#64748b", fontSize: "1.2rem", fontWeight: "600" }}>Total Workflows</h3>
          <div style={{ fontSize: "3.5rem", fontWeight: "800", color: "#1e293b", lineHeight: "1" }}>{workflowCount}</div>
        </div>

        {/* System Status Card */}
        <div style={{ background: "white", padding: "40px 30px", borderRadius: "24px", boxShadow: "0 20px 40px rgba(0,0,0,0.04)", border: "1px solid #f1f5f9", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transition: "transform 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform="translateY(-5px)"} onMouseLeave={e => e.currentTarget.style.transform="translateY(0)"}>
          <div style={{ width: "70px", height: "70px", borderRadius: "20px", background: "#dcfce7", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem", marginBottom: "20px" }}>
            ✅
          </div>
          <h3 style={{ margin: "0 0 10px 0", color: "#64748b", fontSize: "1.2rem", fontWeight: "600" }}>System Status</h3>
          <div style={{ fontSize: "2.5rem", fontWeight: "800", color: "#16a34a", lineHeight: "1", marginTop: "10px" }}>Active</div>
        </div>
      </div>
    </div>
  );
}