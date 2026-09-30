const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const contentType = response.headers.get("content-type") || "";
  const body = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    throw new Error(typeof body === "string" ? body : "Something went wrong.");
  }

  return body;
}

export const api = {
  getUsers: () => request("/users"),
  getProjectsForUser: (userId) => request(`/users/${userId}/projects`),
  createProject: (userId, project) =>
    request(`/users/${userId}/projects`, {
      method: "POST",
      body: JSON.stringify(project),
    }),
  getProjectTasks: (projectId) => request(`/projects/${projectId}/tasks`),
  getTasksByCompletion: (projectId, status) =>
    request(`/projects/${projectId}/tasks/completed?status=${status}`),
  getTasksByPriority: (projectId, priority) =>
    request(`/projects/${projectId}/tasks/priority/${priority}`),
  createTask: (projectId, task) =>
    request(`/projects/${projectId}/tasks`, {
      method: "POST",
      body: JSON.stringify(task),
    }),
  toggleTask: (taskId) => request(`/tasks/${taskId}/toggle`, { method: "PATCH" }),
  clearCompletedTasks: (projectId) =>
    request(`/projects/${projectId}/tasks/completed`, { method: "DELETE" }),
};
