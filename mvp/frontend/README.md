# FlowForge frontend

FlowForge is a multi-page React + Vite product experience for teams that want projects, priorities, and daily work in one focused workspace.

## Run locally

```bash
npm install
npm run dev
```

The site uses realistic in-browser demo data by default, so it works when deployed without a backend.

## Deploy to Vercel

Import the repository in Vercel and set the project root directory to `frontend`. Vercel detects Vite automatically:

- Build command: `npm run build`
- Output directory: `dist`

`vercel.json` rewrites routes to the React app so direct visits to pages such as `/workspace` continue to work.
