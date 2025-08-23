# StayHealthy — Merged (React / CRA)

A Create React App–style starter that merges your working flows with a clean UI.

## Run
```bash
npm install
npm start
```

## Routes
- `/` Landing
- `/signup` Sign Up (validation)
- `/login` Login (validation)
- `/appointments` Protected (requires sign-up/login)
- `/profile` Protected (update details)

Auth & profile are persisted in `localStorage` via `src/context/AuthContext.js`.
