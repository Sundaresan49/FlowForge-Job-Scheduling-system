import { useEffect, useMemo, useState } from "react";
import { api } from "./api";

const emptyProject = { name: "", description: "", status: "ONGOING" };
const emptyTask = {
  title: "",
  description: "",
  prioriti: "MEDIUM",
  datetime: "",
  iscompleted: false,
};

const priorityStyles = {
  HIGH: "bg-rose-100 text-rose-700",
  MEDIUM: "bg-amber-100 text-amber-700",
  LOW: "bg-emerald-100 text-emerald-700",
};

function ProjectForm({ onSubmit, disabled }) {
  const [project, setProject] = useState(emptyProject);

  async function submit(event) {
    event.preventDefault();
    await onSubmit(project);
    setProject(emptyProject);
  }

  return (
    <form onSubmit={submit} className="space-y-3 border-t border-slate-200 pt-4">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">New project</p>
      <input className="field" placeholder="Project name" required value={project.name} disabled={disabled}
        onChange={(event) => setProject({ ...project, name: event.target.value })} />
      <textarea className="field min-h-20 resize-y" placeholder="Short description" value={project.description} disabled={disabled}
        onChange={(event) => setProject({ ...project, description: event.target.value })} />
      <select className="field" value={project.status} disabled={disabled}
        onChange={(event) => setProject({ ...project, status: event.target.value })}>
        <option value="ONGOING">Ongoing</option>
        <option value="ONHOLD">On hold</option>
        <option value="BLOCKED">Blocked</option>
        <option value="INREVIEW">In review</option>
        <option value="COMPLETED">Completed</option>
      </select>
      <button className="btn-primary w-full" disabled={disabled}>Create project</button>
    </form>
  );
}

function TaskForm({ onSubmit, disabled }) {
  const [task, setTask] = useState(emptyTask);

  async function submit(event) {
    event.preventDefault();
    await onSubmit(task);
    setTask(emptyTask);
  }

  return (
    <form onSubmit={submit} className="grid gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 sm:grid-cols-2">
      <input className="field" placeholder="Task title" required value={task.title} disabled={disabled}
        onChange={(event) => setTask({ ...task, title: event.target.value })} />
      <select className="field" value={task.prioriti} disabled={disabled}
        onChange={(event) => setTask({ ...task, prioriti: event.target.value })}>
        <option value="HIGH">High priority</option>
        <option value="MEDIUM">Medium priority</option>
        <option value="LOW">Low priority</option>
      </select>
      <textarea className="field min-h-20 sm:col-span-2" placeholder="Task description" value={task.description} disabled={disabled}
        onChange={(event) => setTask({ ...task, description: event.target.value })} />
      <input className="field" type="datetime-local" value={task.datetime} disabled={disabled}
        onChange={(event) => setTask({ ...task, datetime: event.target.value })} />
      <button className="btn-primary" disabled={disabled}>Add task</button>
    </form>
  );
}

function TaskCard({ task, onToggle, disabled }) {
  const done = task.iscompleted;
  return (
    <article className={`rounded-xl border p-4 shadow-sm transition ${done ? "border-emerald-100 bg-emerald-50/50" : "border-slate-200 bg-white"}`}>
      <div className="flex items-start gap-3">
        <input aria-label={`Mark ${task.title} complete`} type="checkbox" checked={done} disabled={disabled}
          onChange={() => onToggle(task.id)} className="mt-1 h-4 w-4 accent-indigo-600" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className={`font-semibold ${done ? "text-slate-400 line-through" : "text-slate-800"}`}>{task.title}</h3>
            <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${priorityStyles[task.prioriti] || "bg-slate-100 text-slate-600"}`}>{task.prioriti || "UNSET"}</span>
          </div>
          {task.description && <p className={`mt-2 text-sm ${done ? "text-slate-400" : "text-slate-600"}`}>{task.description}</p>}
          {task.datetime && <p className="mt-3 text-xs font-medium text-slate-400">Due {new Date(task.datetime).toLocaleString()}</p>}
        </div>
      </div>
    </article>
  );
}

export default function App() {
  const [users, setUsers] = useState([]);
  const [activeUserId, setActiveUserId] = useState("");
  const [projects, setProjects] = useState([]);
  const [activeProjectId, setActiveProjectId] = useState("");
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");

  const activeUser = useMemo(() => users.find((user) => String(user.id) === activeUserId), [users, activeUserId]);
  const activeProject = useMemo(() => projects.find((project) => String(project.id) === activeProjectId), [projects, activeProjectId]);

  function showError(error) {
    setNotice(error.message || "Something went wrong.");
  }

  useEffect(() => {
    api.getUsers().then((data) => {
      setUsers(data);
      if (data.length) setActiveUserId(String(data[0].id));
    }).catch(showError);
  }, []);

  useEffect(() => {
    if (!activeUserId) {
      setProjects([]);
      return;
    }
    api.getProjectsForUser(activeUserId).then((data) => {
      setProjects(data);
      setActiveProjectId(data.length ? String(data[0].id) : "");
    }).catch(showError);
  }, [activeUserId]);

  async function loadTasks() {
    if (!activeProjectId) return;
    setLoading(true);
    try {
      let data;
      if (statusFilter !== "ALL") {
        data = await api.getTasksByCompletion(activeProjectId, statusFilter === "COMPLETED");
      } else if (priorityFilter !== "ALL") {
        data = await api.getTasksByPriority(activeProjectId, priorityFilter);
      } else {
        data = await api.getProjectTasks(activeProjectId);
      }
      if (statusFilter !== "ALL" && priorityFilter !== "ALL") {
        data = data.filter((task) => task.prioriti === priorityFilter);
      }
      setTasks(data);
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadTasks(); }, [activeProjectId, statusFilter, priorityFilter]);

  async function createProject(project) {
    try {
      await api.createProject(activeUserId, project);
      const data = await api.getProjectsForUser(activeUserId);
      setProjects(data);
      setActiveProjectId(String(data[data.length - 1]?.id || ""));
      setNotice("Project created.");
    } catch (error) { showError(error); }
  }

  async function createTask(task) {
    try {
      await api.createTask(activeProjectId, task);
      await loadTasks();
      setNotice("Task added.");
    } catch (error) { showError(error); }
  }

  async function toggleTask(taskId) {
    try {
      await api.toggleTask(taskId);
      await loadTasks();
    } catch (error) { showError(error); }
  }

  async function clearCompleted() {
    if (!window.confirm("Remove every completed task from this project?")) return;
    try {
      await api.clearCompletedTasks(activeProjectId);
      await loadTasks();
      setNotice("Completed tasks cleared.");
    } catch (error) { showError(error); }
  }

  return (
    <main className="min-h-screen">
      <header className="border-b border-slate-800 bg-slate-950 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="text-xl font-black tracking-tight">Flow<span className="text-indigo-400">Forge</span></p><p className="text-sm text-slate-400">A focused workspace for your projects and tasks.</p></div>
          <label className="flex items-center gap-3 text-sm font-semibold text-slate-300">Active user
            <select className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-indigo-400" value={activeUserId} onChange={(event) => setActiveUserId(event.target.value)}>
              {!users.length && <option>No users found</option>}
              {users.map((user) => <option key={user.id} value={user.id}>{user.name} · {user.email}</option>)}
            </select>
          </label>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-7 lg:grid-cols-[300px_1fr]">
        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-4"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Projects</p><h1 className="mt-1 text-lg font-bold">{activeUser ? `${activeUser.name}'s work` : "Select a user"}</h1></div>
          <div className="mb-5 space-y-2">
            {projects.map((project) => <button key={project.id} onClick={() => setActiveProjectId(String(project.id))}
              className={`w-full rounded-xl p-3 text-left transition ${String(project.id) === activeProjectId ? "bg-indigo-600 text-white shadow-md" : "bg-slate-50 hover:bg-indigo-50"}`}>
              <p className="font-semibold">{project.name}</p><p className={`mt-1 line-clamp-2 text-xs ${String(project.id) === activeProjectId ? "text-indigo-100" : "text-slate-500"}`}>{project.description || "No description"}</p>
            </button>)}
            {activeUserId && !projects.length && <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-500">No projects yet. Create the first one below.</p>}
          </div>
          <ProjectForm onSubmit={createProject} disabled={!activeUserId} />
        </aside>

        <section className="min-w-0">
          {notice && <div className="mb-4 flex items-center justify-between rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-800"><span>{notice}</span><button onClick={() => setNotice("")} aria-label="Dismiss message" className="font-bold">×</button></div>}
          {!activeProject ? <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500">Choose or create a project to start managing tasks.</div> : <>
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div><p className="text-xs font-bold uppercase tracking-wider text-indigo-600">{activeProject.status || "ONGOING"}</p><h2 className="mt-1 text-3xl font-black tracking-tight">{activeProject.name}</h2><p className="mt-1 text-slate-500">{activeProject.description}</p></div>
              <button onClick={clearCompleted} className="btn-secondary border-rose-200 text-rose-700 hover:bg-rose-50">Clear completed</button>
            </div>
            <TaskForm onSubmit={createTask} />
            <div className="my-5 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold text-slate-600">Task filters</p>
              <div className="flex flex-wrap gap-2"><select className="field w-auto" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option value="ALL">All statuses</option><option value="ACTIVE">Active</option><option value="COMPLETED">Completed</option></select><select className="field w-auto" value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value)}><option value="ALL">All priorities</option><option value="HIGH">High</option><option value="MEDIUM">Medium</option><option value="LOW">Low</option></select></div>
            </div>
            {loading ? <p className="py-10 text-center text-slate-400">Loading tasks…</p> : <div className="grid gap-3">{tasks.map((task) => <TaskCard key={task.id} task={task} onToggle={toggleTask} />)}{!tasks.length && <div className="rounded-xl border border-dashed border-slate-300 bg-white py-10 text-center text-slate-500">No tasks match this view.</div>}</div>}
          </>}
        </section>
      </div>
    </main>
  );
}
