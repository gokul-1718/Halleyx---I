import React, { useState } from "react";
import { startExecution, getLogs } from "../api/executionApi";
import "../styles/execution.css";

const ExecutionPage = () => {
  const [workflowId, setWorkflowId] = useState(1);
  const [amount, setAmount] = useState(""); // 🔥 dynamic input
  const [executionId, setExecutionId] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🚀 START EXECUTION
  const handleStart = async () => {
    try {
      if (!workflowId) {
        alert("Enter workflow ID");
        return;
      }

      if (!amount) {
        alert("Enter amount");
        return;
      }

      setLoading(true);

      const res = await startExecution(workflowId, {
        amount: Number(amount), // 🔥 send dynamic data
      });

      console.log("Execution Response:", res);

      setExecutionId(res.id);

      alert("Execution Started ✅");

    } catch (err) {
      console.error(err);
      alert("Failed to start execution ❌");
    } finally {
      setLoading(false);
    }
  };

  // 📜 FETCH LOGS
  const handleLogs = async () => {
    try {
      if (!executionId) {
        alert("Start execution first ⚠️");
        return;
      }

      setLoading(true);

      const data = await getLogs(executionId);
      setLogs(data);

    } catch (err) {
      console.error(err);
      alert("Failed to fetch logs ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="exec-container">
      <h1 className="exec-title">🚀 Workflow Execution</h1>

      {/* INPUT SECTION */}
      <div className="exec-controls">
        <input
          type="number"
          placeholder="Workflow ID"
          value={workflowId}
          onChange={(e) => setWorkflowId(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button onClick={handleStart}>
          🚀 Start Execution
        </button>

        <button onClick={handleLogs}>
          🔄 Fetch Logs
        </button>
      </div>

      {/* TERMINAL UI */}
      <div className="terminal">
        <div className="terminal-header">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
          <span className="title">execution-logs.sh</span>
        </div>

        <div className="terminal-body">
          {loading ? (
            <p className="loading">⏳ Processing...</p>
          ) : logs.length === 0 ? (
            <p className="empty">
              No logs yet. Start execution 🚀
            </p>
          ) : (
            logs.map((log, i) => (
              <div key={i} className="log-line">
                $ {log.message || JSON.stringify(log)}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ExecutionPage;