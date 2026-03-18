const API_BASE_URL = "http://localhost:8080/executions";

// 🚀 START EXECUTION (UPDATED 🔥)
export const startExecution = async (workflowId, inputObj) => {
  const res = await fetch(`${API_BASE_URL}/${workflowId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputData: JSON.stringify(inputObj), // 🔥 IMPORTANT
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(err);
    alert("Backend Error: " + err);
    throw new Error("Execution failed");
  }

  return await res.json();
};

// 📜 GET LOGS
export const getLogs = async (executionId) => {
  const res = await fetch(`${API_BASE_URL}/${executionId}/logs`);

  if (!res.ok) {
    throw new Error("Failed to fetch logs");
  }

  return await res.json();
};