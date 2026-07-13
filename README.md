# ASU Paid Volunteer Time Off — 2026 Utilization Report

An interactive dashboard showing Arizona State University's paid volunteer time off utilization across units, built with React and Vite.

## Project structure

```
asu-volunteer-dashboard/
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
├── README.md
└── src/
    ├── main.jsx
    └── App.jsx        ← the dashboard component
```

## Run locally

Prerequisites: [Node.js](https://nodejs.org/) version 18 or later.

```bash
npm install
npm run dev
```

Then open the URL shown in your terminal (usually http://localhost:5173).

## Build for production

```bash
npm run build
```

This creates a `dist/` folder with static files you can host anywhere.

## Upload to GitHub

If you have never used Git or GitHub before, follow these steps.

### One-time setup (skip if you already have Git and a GitHub account)

1. Install Git: https://git-scm.com/downloads
2. Create a GitHub account: https://github.com/signup
3. Open a terminal and configure your identity:
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your-email@asu.edu"
   ```

### Create the repository on GitHub

1. Go to https://github.com/new
2. Repository name: `asu-volunteer-dashboard`
3. Set visibility to Private (this contains internal data)
4. Do NOT check "Add a README file" (we already have one)
5. Click "Create repository"
6. GitHub will show you a page with setup instructions. Keep that page open.

### Push the code

Open a terminal, navigate to the project folder, and run:

```bash
cd asu-volunteer-dashboard
git init
git add .
git commit -m "Initial commit: 2026 volunteer time dashboard"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/asu-volunteer-dashboard.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

GitHub will prompt you to authenticate. If you have not set up authentication, the simplest method is to create a Personal Access Token:
1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a name, select the "repo" scope, and click "Generate token"
4. Copy the token and use it as your password when Git prompts you

### Optional: Deploy to GitHub Pages

If you want a live URL anyone can view:

1. Build the project: `npm run build`
2. Install the GitHub Pages deploy tool: `npm install --save-dev gh-pages`
3. Add this to the `"scripts"` section of `package.json`:
   ```json
   "deploy": "gh-pages -d dist"
   ```
4. Run: `npm run deploy`
5. In your GitHub repo, go to Settings, then Pages, and confirm the source is set to the `gh-pages` branch.
6. Your dashboard will be live at `https://YOUR-USERNAME.github.io/asu-volunteer-dashboard/`

Note: If you deploy publicly, be aware this contains internal ASU workforce data. Confirm with your team whether that is appropriate before making it public.

## Updating the data

To update with new data, edit the `unitData` array and the `TOTAL_USED`, `TOTAL_AVAILABLE`, and `TOTAL_HEADCOUNT` constants at the top of `src/App.jsx`. Then commit and push:

```bash
git add .
git commit -m "Update data through [new date]"
git push
```
