const BASE_URL = "http://localhost:8000";

export const fetchTasks = async () => {
  const res = await fetch(`${BASE_URL}/todos`);
  return res.json();
};

export const createTask = async (task) => {
  const res = await fetch(`${BASE_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
};

export const updateTask = async (id, task) => {
  const res = await fetch(`${BASE_URL}/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
};

export const deleteTask = async (id) => {
  await fetch(`${BASE_URL}/todos/${id}`, { method: "DELETE" });
};
