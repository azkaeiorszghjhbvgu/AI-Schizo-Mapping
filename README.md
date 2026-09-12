# Romania Map Pathfinding

A web app comparing a **blind search** (Uniform-Cost Search / Dijkstra's) against a **heuristic
search** (A* with straight-line-distance heuristic) on the classic Romania road map. Any city can
be chosen as start or goal.

No build step, no dependencies — plain HTML, CSS, and JavaScript.

## Assignment Brief

- **Problem**: The Romania-Map Pathfinding problem.
  - Implement 1 blind search and 1 custom heuristic search.
  - Any arbitrary cities can be selected as the start and goal states.
  - Compare the runtime, space, and path cost between the blind and heuristic searches.
- **Grading criteria**: Creativity, Completeness, and Presentation skills.
- **Due date**: 9 AM Tuesday, October 13, 2026.
- **Things to turn in**:
  - Web App URL (must be deployed onto a host computer) — _TODO: add deployed URL here_
  - A link to the GitHub repository, provided within the web app — see footer of `index.html`
  - Presentation clip link on YouTube (approx. 10–15 minutes) — _TODO: add video link here_

## Algorithms implemented

| | Blind search | Heuristic search |
|---|---|---|
| Algorithm | Uniform-Cost Search (UCS / Dijkstra's) | A* Search |
| Informed by | Accumulated path cost only | Path cost + straight-line distance to goal |
| Optimal (cost-wise) | Yes | Yes (admissible heuristic) |
| Metrics compared | Path cost, nodes expanded, max frontier size, runtime | Same |

## Run locally

Open `index.html` directly in a browser, or serve the folder with any static server, e.g.:

```
python -m http.server 8080
```

then visit http://localhost:8080.

## How it works

- `js/data.js` — the 20 Romania cities, road distances, and a calibrated straight-line heuristic
  that works for **any** start/goal pair (not just goal = Bucharest).
- `js/search.js` — `uniformCostSearch` (blind/uninformed) and `aStarSearch` (informed, uses the
  heuristic). Both return path, cost, nodes expanded, max frontier size, and runtime.
- `js/map.js` — SVG rendering of the map and path/visited-node highlighting.
- `js/app.js` — wires up the UI, runs both algorithms, animates the search, and renders the
  comparison table.

## Deploy

Any static host works since there's no build step:

- **GitHub Pages**: push this folder to a GitHub repo, then enable Pages (Settings → Pages →
  deploy from `main` branch, root folder).
- **Vercel/Netlify**: import the repo, leave build command empty, output directory = `/`.

After deploying, update the GitHub link in the footer of `index.html` to point at your repo.
