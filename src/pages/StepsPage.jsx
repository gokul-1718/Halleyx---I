import React, { useEffect, useState } from "react";
import { getWorkflows, createStep } from "../api/stepApi";
import "../styles/steps.css";

const StepsPage = () => {
  const [workflows, setWorkflows] = useState([]);
  const [stepName, setStepName] = useState("");
  const [stepType, setStepType] = useState("APPROVAL");

  useEffect(() => {
    loadWorkflows();
  }, []);

  const loadWorkflows = async () => {
    const data = await getWorkflows();
    setWorkflows(data);
  };

  const handleAddStep = async () => {
    if (!stepName.trim()) return;

    await createStep({
      name: stepName,
      steps: [{ name: stepName, type: stepType }],
    });

    setStepName("");
    loadWorkflows();
  };

  return (
    <div className="container">
      <h1 className="title">⚡ Workflow Steps</h1>

      <div className="card input-card">
        <input
          placeholder="Enter step name..."
          value={stepName}
          onChange={(e) => setStepName(e.target.value)}
        />

        <select
          value={stepType}
          onChange={(e) => setStepType(e.target.value)}
        >
          <option>APPROVAL</option>
          <option>TASK</option>
        </select>

        <button onClick={handleAddStep}>+ Add</button>
      </div>

      <div className="grid">
        {workflows.map((wf) => (
          <div className="card workflow-card" key={wf.id}>
            <h3>{wf.name}</h3>

            {wf.steps?.map((step, i) => (
              <div key={i} className="step">
                {step.name} <span>{step.type}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepsPage;