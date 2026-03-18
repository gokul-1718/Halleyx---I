const API_BASE_URL = "http://localhost:8080/workflows";

// GET all workflows
export const getWorkflows = async () => {
  const res = await fetch(API_BASE_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch workflows");
  }

  return await res.json();
};

// CREATE workflow (IMPORTANT FIX)
export const createStep = async (data) => {
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Backend Error:", err);
    throw new Error("Failed to create workflow");
  }

  return await res.json();
};