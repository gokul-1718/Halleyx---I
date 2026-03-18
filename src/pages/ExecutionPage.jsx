import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/execution.css";

const ExecutionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeWf = location.state?.workflow;

  const [amount, setAmount] = useState("");
  const [activeStep, setActiveStep] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const terminalEndRef = useRef(null);

  // Auto scroll terminal to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Evaluate Dynamic Rules
  const evaluateRule = (rule, val) => {
    const num = Number(val);
    switch(rule.operator) {
      case '<': return num < rule.value;
      case '<=': return num <= rule.value;
      case '>': return num > rule.value;
      case '>=': return num >= rule.value;
      case '===': return num === rule.value;
      case 'between': return num >= rule.min && num <= rule.max;
      default: return false;
    }
  };

  // 🚀 SIMULATE STATIC EXECUTION
  const handleSimulate = () => {
    if (!amount || isNaN(amount)) {
      alert("Please enter a valid numeric value! ⚠️");
      return;
    }

    setLoading(true);
    setActiveStep(null);
    setLogs([`$ Starting execution for workflow: '${activeWf.name}'...`, `$ Parsing input value: ${amount}`]);

    const numericAmount = Number(amount);

    // Fake delay for realistic feeling
    setTimeout(() => {
      setLogs(prev => [...prev, `$ Evaluating business rules...`]);
      
      const matchedRule = activeWf.rules.find(rule => evaluateRule(rule, numericAmount));

      if (matchedRule) {
        setTimeout(() => {
          setActiveStep(matchedRule.id);
          setLogs(prev => [
            ...prev, 
            `> Match found! Triggering Rule ${matchedRule.id}: [${matchedRule.name}]`,
            `> Status: Successfully routed to ${matchedRule.name} ✅`
          ]);
          setLoading(false);
        }, 800);
      } else {
        setLogs(prev => [...prev, `> Error: No matching rule found for this amount ❌`]);
        setLoading(false);
      }
    }, 600);
  };

  if (!activeWf) {
    return (
      <div style={{ maxWidth: "800px", margin: "100px auto", textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", color: "#1e293b", marginBottom: "15px" }}>No workflow selected! ⚠️</h2>
        <p style={{ color: "#64748b", fontSize: "1.1rem", marginBottom: "30px" }}>Please go to the Steps page and select a workflow to execute.</p>
        <button onClick={() => navigate("/steps")} style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)", color: "white", padding: "12px 28px", borderRadius: "10px", border: "none", cursor: "pointer", fontWeight: "bold", fontSize: "1.1rem", boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)" }}>
          ← Go to Workflows
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px", fontFamily: "system-ui, sans-serif" }}>
      
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "2.8rem", fontWeight: "800", background: "-webkit-linear-gradient(45deg, #4f46e5, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: "0 0 10px 0" }}>
          Interactive Workflow Simulator
        </h1>
        <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>Test your workflow logic instantly on the frontend</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", alignItems: "start" }}>
        
        {/* LEFT PANEL: WORKFLOW UI */}
        <div style={{ background: "#ffffff", padding: "30px", borderRadius: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.08)", border: "1px solid #f3f4f6" }}>
          <h3 style={{ fontSize: "1.4rem", margin: "0 0 5px 0", color: "#1f2937" }}>{activeWf.name}</h3>
          <p style={{ color: "#6b7280", fontSize: "0.95rem", marginBottom: "25px" }}>{activeWf.description}</p>
          
          {/* AMOUNT INPUT */}
          <div style={{ marginBottom: "30px", background: "#f8fafc", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
            <label style={{ display: "block", fontSize: "0.9rem", fontWeight: "600", color: "#475569", marginBottom: "8px" }}>Enter Input Value</label>
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="number"
                placeholder="e.g., 2500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ flex: "1", padding: "12px 16px", fontSize: "1.1rem", border: "2px solid #cbd5e1", borderRadius: "8px", outline: "none", transition: "border-color 0.2s" }}
                onFocus={(e) => e.target.style.borderColor = "#6366f1"}
                onBlur={(e) => e.target.style.borderColor = "#cbd5e1"}
              />
              <button 
                onClick={handleSimulate} 
                disabled={loading}
                style={{ background: loading ? "#94a3b8" : "linear-gradient(135deg, #6366f1, #4f46e5)", color: "white", border: "none", padding: "0 24px", borderRadius: "8px", fontSize: "1rem", fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)", transition: "transform 0.1s" }}
                onMouseDown={(e) => !loading && (e.target.style.transform = "scale(0.95)")}
                onMouseUp={(e) => !loading && (e.target.style.transform = "scale(1)")}
              >
                {loading ? "⚙️ Running..." : "🚀 Simulate"}
              </button>
            </div>
          </div>

          {/* WORKFLOW RULES (STEPS) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <h4 style={{ margin: "0", color: "#475569", fontSize: "1rem" }}>Workflow Rules Engine</h4>
            {activeWf.rules.map((rule) => {
              const isActive = activeStep === rule.id;
              return (
                <div 
                  key={rule.id} 
                  style={{
                    padding: "16px 20px",
                    borderRadius: "12px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: `2px solid ${isActive ? rule.color : '#e2e8f0'}`,
                    background: isActive ? `${rule.color}10` : '#ffffff',
                    boxShadow: isActive ? `0 0 15px ${rule.color}40` : 'none',
                    transform: isActive ? 'scale(1.02)' : 'scale(1)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    opacity: activeStep && !isActive ? 0.4 : 1
                  }}
                >
                  <div>
                    <div style={{ fontWeight: "700", color: isActive ? rule.color : "#334155", fontSize: "1.1rem" }}>{rule.name}</div>
                    <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "4px" }}>Condition: {rule.desc}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "50%", background: isActive ? rule.color : "#f1f5f9", color: isActive ? "white" : "#94a3b8", fontWeight: "bold" }}>
                    {isActive ? "✓" : rule.id}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT PANEL: TERMINAL LOGS */}
        <div style={{ background: "#0f172a", borderRadius: "20px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.2)", display: "flex", flexDirection: "column", height: "100%", minHeight: "450px" }}>
          
          {/* Mac window header */}
          <div style={{ background: "#1e293b", padding: "12px 20px", display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid #334155" }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ef4444" }}></div>
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#eab308" }}></div>
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#22c55e" }}></div>
            <span style={{ color: "#94a3b8", fontSize: "0.85rem", marginLeft: "10px", fontFamily: "monospace" }}>workflow-engine.sh</span>
          </div>

          {/* Terminal content */}
          <div style={{ padding: "20px", color: "#e2e8f0", fontFamily: "'Fira Code', 'Courier New', Courier, monospace", fontSize: "0.95rem", flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px" }}>
            {logs.length === 0 ? (
              <div style={{ color: "#64748b", fontStyle: "italic" }}>Waiting for execution to start...</div>
            ) : (
              logs.map((log, index) => (
                <div key={index} style={{ color: log.includes("Error") ? "#ef4444" : log.includes("Match") || log.includes("Success") ? "#22c55e" : "#60a5fa", lineHeight: "1.5" }}>
                  {log}
                </div>
              ))
            )}
            
            {loading && (
              <div style={{ color: "#f59e0b", animation: "pulse 1.5s infinite" }}>
                &gt; processing...
              </div>
            )}
            <div ref={terminalEndRef} />
          </div>
        </div>

      </div>
      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>
    </div>
  );
};

export default ExecutionPage;