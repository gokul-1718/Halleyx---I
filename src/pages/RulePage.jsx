import React, { useState } from "react";

const RulePage = () => {
  const [stepId, setStepId] = useState("");
  const [condition, setCondition] = useState("");
  const [nextStepId, setNextStepId] = useState("");

  const handleAddRule = async () => {
    await fetch("http://localhost:8080/rules", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stepId: Number(stepId),
        condition: condition,
        nextStepId: nextStepId ? Number(nextStepId) : null,
        priority: 1,
      }),
    });

    alert("Rule Added ✅");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Add Rule</h2>

      <input
        placeholder="Step ID"
        onChange={(e) => setStepId(e.target.value)}
      />

      <input
        placeholder="Condition (e.g. amount > 10000)"
        onChange={(e) => setCondition(e.target.value)}
      />

      <input
        placeholder="Next Step ID"
        onChange={(e) => setNextStepId(e.target.value)}
      />

      <button onClick={handleAddRule}>Add Rule</button>
    </div>
  );
};

export default RulePage;