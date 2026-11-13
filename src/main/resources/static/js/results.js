const resultForm = document.getElementById("result-form");
const nameField = document.getElementById("election-name");
const submitBtn = document.getElementById("result-submit");
const latestResultEl = document.getElementById("latest-result");
const listEl = document.getElementById("result-list");
const emptyEl = document.getElementById("result-empty");

let candidatesById = {};

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}

async function loadCandidates() {
  try {
    const candidates = await apiRequest("/api/candidate");
    candidatesById = Object.fromEntries(candidates.map((c) => [c.id, c]));
  } catch (err) {
    showToast(err.message, "error");
  }
}

function candidateName(id) {
  const c = candidatesById[id];
  return c ? `${c.name} (${c.party})` : id != null ? `Candidate #${id}` : "No votes cast";
}

function renderLatest(result) {
  latestResultEl.innerHTML = `
    <div class="card" style="margin-top:1.5rem; border-left-color: var(--seal);">
      <h3>${escapeHtml(result.electionName)}</h3>
      <p class="helper-text">${result.totalVotes} total vote${result.totalVotes === 1 ? "" : "s"}</p>
      <p><strong>Winner:</strong> ${escapeHtml(candidateName(result.winnerId))}
        ${result.winnerVotes != null ? ` — ${result.winnerVotes} votes` : ""}</p>
    </div>
  `;
}

function renderResults(results) {
  listEl.innerHTML = "";
  emptyEl.style.display = results.length ? "none" : "block";

  [...results].reverse().forEach((result, index) => {
    const li = document.createElement("li");
    li.className = "roll-row";
    li.innerHTML = `
      <span class="roll-number">${index + 1}</span>
      <span class="roll-main">
        <strong>${escapeHtml(result.electionName)}</strong>
        <span class="roll-meta">
          ${result.totalVotes} votes · won by ${escapeHtml(candidateName(result.winnerId))}
        </span>
      </span>
      <span></span>
    `;
    listEl.appendChild(li);
  });
}

async function loadResults() {
  try {
    const results = await apiRequest("/api/election-result");
    renderResults(results);
  } catch (err) {
    showToast(err.message, "error");
  }
}

resultForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  document.getElementById("err-name").textContent = "";

  if (!nameField.value.trim()) {
    document.getElementById("err-name").textContent = "Election name is required.";
    return;
  }

  submitBtn.disabled = true;
  try {
    const result = await apiRequest("/api/election-result/declare", {
      method: "POST",
      body: { electionName: nameField.value.trim() },
    });
    showToast("Result declared.", "success");
    renderLatest(result);
    resultForm.reset();
    loadResults();
  } catch (err) {
    showToast(err.message, "error");
  } finally {
    submitBtn.disabled = false;
  }
});

document.getElementById("refresh-results").addEventListener("click", loadResults);

async function init() {
  await loadCandidates();
  await loadResults();
}

document.addEventListener("DOMContentLoaded", init);
