const startSelect = document.getElementById("start-city");
const goalSelect = document.getElementById("goal-city");
const runBtn = document.getElementById("run-btn");
const bfsSvg = document.getElementById("bfs-map");
const astarSvg = document.getElementById("astar-map");
const resultsBody = document.getElementById("results-body");
const statusEl = document.getElementById("status");

function populateSelect(select, defaultCity) {
  for (const city of CITY_NAMES) {
    const opt = document.createElement("option");
    opt.value = city;
    opt.textContent = city;
    if (city === defaultCity) opt.selected = true;
    select.appendChild(opt);
  }
}

populateSelect(startSelect, "Arad");
populateSelect(goalSelect, "Bucharest");
drawBaseMap(bfsSvg);
drawBaseMap(astarSvg);

function animateExpansion(svg, expansionOrder, path, start, goal, delayMs) {
  return new Promise((resolve) => {
    let i = 0;
    function step() {
      if (i < expansionOrder.length) {
        setNodeState(svg, expansionOrder[i], "visited");
        i++;
        setTimeout(step, delayMs);
      } else {
        if (path) {
          highlightPathEdges(svg, path);
          path.forEach((c) => setNodeState(svg, c, "on-path"));
        }
        setNodeState(svg, start, "start");
        setNodeState(svg, goal, "goal");
        resolve();
      }
    }
    step();
  });
}

function renderRow(name, result) {
  const tr = document.createElement("tr");
  const pathStr = result.found ? result.path.join(" → ") : "No path found";
  tr.innerHTML = `
    <td>${name}</td>
    <td class="path-cell">${pathStr}</td>
    <td>${result.found ? result.cost : "—"}</td>
    <td>${result.nodesExpanded}</td>
    <td>${result.maxFrontierSize}</td>
    <td>${result.runtimeMs.toFixed(3)}</td>
  `;
  resultsBody.appendChild(tr);
}

async function runComparison() {
  const start = startSelect.value;
  const goal = goalSelect.value;

  runBtn.disabled = true;
  statusEl.textContent = `Searching from ${start} to ${goal}...`;
  resultsBody.innerHTML = "";
  drawBaseMap(bfsSvg);
  drawBaseMap(astarSvg);

  if (start === goal) {
    statusEl.textContent = "Start and goal are the same city.";
  }

  const bfsResult = breadthFirstSearch(start, goal);
  const astarResult = aStarSearch(start, goal);

  await Promise.all([
    animateExpansion(bfsSvg, bfsResult.expansionOrder, bfsResult.path, start, goal, 220),
    animateExpansion(astarSvg, astarResult.expansionOrder, astarResult.path, start, goal, 220),
  ]);

  renderRow("Breadth-First Search (blind)", bfsResult);
  renderRow("A* Search (heuristic: straight-line distance)", astarResult);

  statusEl.textContent = `Done. BFS expanded ${bfsResult.nodesExpanded} nodes; A* expanded ${astarResult.nodesExpanded} nodes.`;
  runBtn.disabled = false;
}

runBtn.addEventListener("click", runComparison);

// Run once on load with the defaults so the page isn't empty.
runComparison();
