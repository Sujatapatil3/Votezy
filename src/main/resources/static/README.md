# Votezy Frontend

Plain HTML/CSS/JS frontend for your Spring Boot + MySQL Votezy backend. No
build step — just open it in a browser.

## Files

```
index.html        Overview / dashboard with live stats
voters.html        Register, edit, delete voters
candidates.html     Register, edit, delete candidates
vote.html          Cast a vote
results.html        Declare and view election results
css/style.css       Shared styling
js/config.js         API base URL — edit this first
js/api.js            Shared fetch wrapper, toasts, connection status
js/home.js, js/voters.js, js/candidates.js, js/vote.js, js/results.js
```

## 1. Point it at your backend

Open `js/config.js` and set the URL your Spring Boot app runs on:

```js
const API_BASE = "http://localhost:8080";
```

## 2. Make sure CORS is enabled

Your controllers already have `@CrossOrigin` with no restrictions, so any
origin is allowed — nothing else to do here. If you later lock it down to
specific origins, add the origin you're serving this frontend from (e.g.
`http://127.0.0.1:5500` if you use VS Code's Live Server).

## 3. Run it

Easiest: just double-click `index.html`, or right-click → "Open with
Browser". For the smoothest experience (avoids some browsers' quirks with
`file://` pages), serve it locally instead, e.g. from this folder:

```bash
npx serve .
# or
python -m http.server 5500
```

Then visit the printed `localhost` URL.

## 4. Start your backend

Start your Spring Boot app so it's listening on the port in `config.js`
(default assumed: 8080). The footer on every page shows a live "Connected /
Not reachable" status against `API_BASE`, so you'll know immediately if the
two aren't talking.

## Notes on your current API

- There's no login/authentication endpoint yet — `vote.html` just lets you
  pick any registered voter from a dropdown. Voters who already have
  `hasVoted = true` are shown but disabled in the list, so a second vote
  can't be submitted from the UI (your backend should still be the one
  source of truth here, if it isn't already).
- `GET /api/election-result` returns only `winnerId`, not the winner's name
  — the results page fetches all candidates separately and matches the ID
  to a name for display.
- Delete endpoints return a plain string, not JSON — `js/api.js` already
  handles both string and JSON responses so this doesn't break anything.

## Next steps you might want

- Add a real login/session so only an authenticated voter can vote as
  themselves, and only an admin can manage candidates/declare results.
- Add pagination if voter/candidate lists get long.
