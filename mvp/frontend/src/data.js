export const teams = [
  { id: "orbit", name: "Orbit Product", short: "OP", color: "#4285F4", members: ["Maya", "Arjun", "Nora", "Liam"], focus: "Product strategy and delivery" },
  { id: "canvas", name: "Canvas Studio", short: "CS", color: "#EA4335", members: ["Aisha", "Theo", "Zoe"], focus: "Brand, product, and web design" },
  { id: "growth", name: "Growth Lab", short: "GL", color: "#34A853", members: ["Riya", "Owen", "Ishaan", "Mina"], focus: "Research, campaigns, and launches" },
];

export const projects = [
  { id: "atlas", name: "Atlas mobile launch", team: "Orbit Product", color: "#4285F4", progress: 72, due: "Oct 18", status: "In progress", description: "Ship a focused mobile planning experience for teams that work away from their desks." },
  { id: "signal", name: "Signal brand refresh", team: "Canvas Studio", color: "#EA4335", progress: 48, due: "Oct 24", status: "In progress", description: "Bring the new visual system to our core product surfaces and launch materials." },
  { id: "fieldnotes", name: "Field Notes campaign", team: "Growth Lab", color: "#34A853", progress: 88, due: "Oct 09", status: "Review", description: "Turn customer stories into a compact campaign for the autumn release." },
  { id: "onboarding", name: "New team onboarding", team: "Orbit Product", color: "#FBBC04", progress: 28, due: "Nov 05", status: "Planning", description: "Make every new teammate productive, connected, and confident in their first week." },
];

export const initialTasks = [
  { id: 1, title: "Map the mobile planning flow", description: "Reduce the first-run setup to three clear decisions.", project: "Atlas mobile launch", assignee: "Maya", initials: "MS", priority: "High", status: "In progress", due: "Today", done: false },
  { id: 2, title: "Review empty-state copy", description: "Make the first project experience calm and specific.", project: "Atlas mobile launch", assignee: "Nora", initials: "NK", priority: "Medium", status: "Review", due: "Tomorrow", done: false },
  { id: 3, title: "Prepare launch QA checklist", description: "Capture device coverage, accessibility checks, and release owners.", project: "Atlas mobile launch", assignee: "Arjun", initials: "AR", priority: "High", status: "To do", due: "Oct 12", done: false },
  { id: 4, title: "Select campaign image direction", description: "Narrow the visual route to one clear story before production starts.", project: "Signal brand refresh", assignee: "Aisha", initials: "AS", priority: "High", status: "In progress", due: "Oct 10", done: false },
  { id: 5, title: "Publish customer interview clips", description: "Trim and caption the three strongest moments from the field interviews.", project: "Field Notes campaign", assignee: "Riya", initials: "RP", priority: "Medium", status: "Review", due: "Oct 08", done: false },
  { id: 6, title: "Draft first-week checklist", description: "Give new teammates a practical starting point without an information dump.", project: "New team onboarding", assignee: "Liam", initials: "LD", priority: "Low", status: "To do", due: "Oct 17", done: false },
  { id: 7, title: "Align release announcement", description: "Confirm product language and rollout timing with the growth team.", project: "Atlas mobile launch", assignee: "Maya", initials: "MS", priority: "Medium", status: "Done", due: "Oct 06", done: true },
];

export const activity = [
  { name: "Maya Singh", initials: "MS", color: "#4285F4", action: "moved “Map the mobile planning flow” to In progress", when: "12 min ago" },
  { name: "Riya Patel", initials: "RP", color: "#34A853", action: "shared final customer interview clips", when: "38 min ago" },
  { name: "Aisha Shah", initials: "AS", color: "#EA4335", action: "updated the Signal brand refresh brief", when: "1 hr ago" },
  { name: "Liam Davis", initials: "LD", color: "#FBBC04", action: "joined Orbit Product", when: "Yesterday" },
];
