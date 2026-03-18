import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Default static workflow
const defaultWorkflow = {
  id: 1,
  name: "💰 Expense Tracker",
  description: "Automatically route expense approvals based on the amount.",
  rules: [
    { id: 1, name: "Auto Approval", desc: "<= 1000", operator: "<=", value: 1000, color: "#10b981" },
    { id: 2, name: "Manager Review", desc: "1001 - 5000", operator: "between", min: 1001, max: 5000, color: "#f59e0b" },
    { id: 3, name: "Finance Audit", desc: "> 5000", operator: ">", value: 5000, color: "#ef4444" }
  ]
};

const colors = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6"];

const StepsPage = () => {
  const [workflows, setWorkflows] = useState(() => {
    const saved = localStorage.getItem("mockWorkflows");
    return saved ? JSON.parse(saved) : [defaultWorkflow];
  });
  const [view, setView] = useState("list"); // 'list', 'create'
  const navigate = useNavigate();
  
  // Create Workflow State
  const [newWfName, setNewWfName] = useState("");
  const [newWfDesc, setNewWfDesc] = useState("");
  const [newRules, setNewRules] = useState([
    { id: Date.now(), name: "", operator: "<=", value: "", min: "", max: "" }
  ]);

  // Save to localStorage whenever workflows change
  useEffect(() => {
    localStorage.setItem("mockWorkflows", JSON.stringify(workflows));
  }, [workflows]);

  // --- CREATE WORKFLOW LOGIC ---
  const handleAddRule = () => {
    setNewRules([...newRules, { id: Date.now(), name: "", operator: "<=", value: "", min: "", max: "" }]);
  };

  const updateRule = (id, field, val) => {
    setNewRules(newRules.map(r => r.id === id ? { ...r, [field]: val } : r));
  };

  const handleSaveWorkflow = () => {
    if (!newWfName.trim()) return alert("Workflow Name is required!");
    
    const formattedRules = newRules.map((r, i) => {
      let desc = "";
      if (r.operator === "between") desc = `${r.min} to ${r.max}`;
      else desc = `${r.operator} ${r.value}`;

      return {
        id: i + 1,
        name: r.name || `Rule ${i + 1}`,
        desc,
        operator: r.operator,
        value: Number(r.value),
        min: Number(r.min),
        max: Number(r.max),
        color: colors[i % colors.length]
      };
    });

    const newWf = {
      id: Date.now(),
      name: `✨ ${newWfName}`,
      description: newWfDesc || "Custom workflow",
      rules: formattedRules
    };

    setWorkflows([...workflows, newWf]);
    setView("list");
    setNewWfName("");
    setNewWfDesc("");
    setNewRules([{ id: Date.now(), name: "", operator: "<=", value: "", min: "", max: "" }]);
  };

  const openSimulator = (wf) => {
    // Pass the workflow data to Execution page via React Router state
    navigate("/execution", { state: { workflow: wf } });
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px", fontFamily: "system-ui, sans-serif" }}>
      
      {/* --- LIST VIEW --- */}
      {view === "list" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
            <div>
              <h1 style={{ fontSize: "2.5rem", margin: "0 0 10px 0", background: "-webkit-linear-gradient(45deg, #4f46e5, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>My Workflows</h1>
              <p style={{ color: "#6b7280", margin: 0 }}>Create and simulate custom business logic.</p>
            </div>
            <button 
              onClick={() => setView("create")}
              style={{ background: "#4f46e5", color: "white", border: "none", padding: "12px 24px", borderRadius: "10px", fontWeight: "bold", fontSize: "1rem", cursor: "pointer", boxShadow: "0 4px 15px rgba(79, 70, 229, 0.3)", display: "flex", gap: "8px", alignItems: "center" }}
            >
              <span>➕</span> Create New Workflow
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
            {workflows.map((wf) => (
              <div 
                key={wf.id} 
                onClick={() => openSimulator(wf)}
                style={{ background: "white", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 10px 25px rgba(0,0,0,0.05)", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.05)"; }}
              >
                <div style={{ background: "#f8fafc", padding: "8px 16px", borderRadius: "8px", display: "inline-block", fontSize: "0.85rem", color: "#64748b", fontWeight: "bold", marginBottom: "16px" }}>
                  {wf.rules.length} Steps Engine
                </div>
                <h3 style={{ fontSize: "1.3rem", margin: "0 0 8px 0", color: "#1e293b" }}>{wf.name}</h3>
                <p style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: "1.5", margin: 0 }}>{wf.description}</p>
                
                <div style={{ marginTop: "24px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {wf.rules.map(r => (
                    <span key={r.id} style={{ fontSize: "0.75rem", padding: "4px 10px", background: `${r.color}20`, color: r.color, borderRadius: "99px", fontWeight: "600" }}>
                      {r.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- CREATE VIEW --- */}
      {view === "create" && (
        <div style={{ background: "white", padding: "40px", borderRadius: "20px", boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}>
          <button onClick={() => setView("list")} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center", gap: "5px", marginBottom: "20px", padding: 0 }}>
            ← Back
          </button>
          
          <h2 style={{ fontSize: "2rem", margin: "0 0 30px 0", color: "#1e293b" }}>🛠️ Build Workflow</h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "40px" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.9rem", fontWeight: "600", color: "#475569", marginBottom: "8px" }}>Workflow Name</label>
              <input type="text" placeholder="e.g., Leave Approval Process" value={newWfName} onChange={e => setNewWfName(e.target.value)} style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: "2px solid #e2e8f0", fontSize: "1rem", outline: "none" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.9rem", fontWeight: "600", color: "#475569", marginBottom: "8px" }}>Description</label>
              <input type="text" placeholder="Describe what this workflow does..." value={newWfDesc} onChange={e => setNewWfDesc(e.target.value)} style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: "2px solid #e2e8f0", fontSize: "1rem", outline: "none" }} />
            </div>
          </div>

          <div style={{ background: "#f8fafc", padding: "30px", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ margin: 0, color: "#334155" }}>Workflow Steps (Rules)</h3>
              <button onClick={handleAddRule} style={{ background: "#10b981", color: "white", border: "none", padding: "8px 16px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
                <span>+</span> Add Step
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {newRules.map((rule, index) => (
                <div key={rule.id} style={{ display: "flex", gap: "15px", alignItems: "center", background: "white", padding: "15px", borderRadius: "12px", border: "1px solid #cbd5e1", boxShadow: "0 4px 6px rgba(0,0,0,0.02)" }}>
                  <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "#4f46e5", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>{index + 1}</div>
                  
                  <input type="text" placeholder="Step Name (e.g. HR Approval)" value={rule.name} onChange={e => updateRule(rule.id, 'name', e.target.value)} style={{ flex: 1.5, padding: "10px", border: "1px solid #cbd5e1", borderRadius: "6px" }} />
                  
                  <select value={rule.operator} onChange={e => updateRule(rule.id, 'operator', e.target.value)} style={{ flex: 1, padding: "10px", border: "1px solid #cbd5e1", borderRadius: "6px", background: "white" }}>
                    <option value="<=">Less than or equal (&lt;=)</option>
                    <option value="<">Less than (&lt;)</option>
                    <option value=">=">Greater than or equal (&gt;=)</option>
                    <option value=">">Greater than (&gt;)</option>
                    <option value="===">Equals (===)</option>
                    <option value="between">Between</option>
                  </select>

                  {rule.operator === "between" ? (
                    <div style={{ display: "flex", gap: "10px", flex: 1.5 }}>
                      <input type="number" placeholder="Min" value={rule.min} onChange={e => updateRule(rule.id, 'min', e.target.value)} style={{ width: "50%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "6px" }} />
                      <input type="number" placeholder="Max" value={rule.max} onChange={e => updateRule(rule.id, 'max', e.target.value)} style={{ width: "50%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "6px" }} />
                    </div>
                  ) : (
                    <input type="number" placeholder="Target Value" value={rule.value} onChange={e => updateRule(rule.id, 'value', e.target.value)} style={{ flex: 1.5, padding: "10px", border: "1px solid #cbd5e1", borderRadius: "6px" }} />
                  )}
                  
                  <button onClick={() => setNewRules(newRules.filter(r => r.id !== rule.id))} style={{ background: "none", border: "none", color: "#ef4444", fontSize: "1.2rem", cursor: "pointer", padding: "5px" }}>🗑️</button>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: "30px", textAlign: "right" }}>
            <button onClick={handleSaveWorkflow} style={{ background: "linear-gradient(135deg, #4f46e5, #ec4899)", color: "white", border: "none", padding: "14px 32px", borderRadius: "10px", fontSize: "1.1rem", fontWeight: "bold", cursor: "pointer", boxShadow: "0 10px 20px rgba(79, 70, 229, 0.3)", transition: "transform 0.1s" }} onMouseDown={e => e.target.style.transform="scale(0.95)"} onMouseUp={e => e.target.style.transform="scale(1)"}>
              💾 Save Workflow
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>
    </div>
  );
};

export default StepsPage;