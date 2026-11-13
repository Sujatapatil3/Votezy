const voteForm = document.getElementById("vote-form");
const voterSelect = document.getElementById("voter-select");
const candidateSelect = document.getElementById("candidate-select");
const submitBtn = document.getElementById("vote-submit");
const listEl = document.getElementById("vote-list");
const emptyEl = document.getElementById("vote-empty");

let votersById = {};
let candidatesById = {};

async function loadOptions() {
  try {
    const [voters, candidates] = await Promise.all([
      apiRequest("/api/voters"),
      apiRequest("/api/candidate"),
    ]);

    votersById = Object.fromEntries(voters.map((v) => [v.id, v]));
    candidatesById = Object.fromEntries(candidates.map((c) => [c.id, c]));

    voterSelect.innerHTML = voters.length
      ? `<option value="">Select a voter…</option>` +
        voters
          .map(
            (v) =>
              `<option value="${v.id}">
                ${escapeHtml(v.name)}${v.hasVoted ? " (already voted)" : ""}
              </option>`
          )
          .join("")
      : `<option value="">No voters registered yet</option>`;

    candidateSelect.innerHTML = candidates.length
      ? `<option value="">Select a candidate…</option>` +
        candidates
          .map((c) => `<option value="${c.id}">${escapeHtml(c.name)} (${escapeHtml(c.party)})</option>`)
          .join("")
      : `<option value="">No candidates registered yet</option>`;
  } catch (err) {
    showToast(err.message, "error");
  }
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}

function updateVoterStatus() {
  const statusEl = document.getElementById("voter-status");
  const voter = votersById[Number(voterSelect.value)];
  if (!voter) {
    statusEl.innerHTML = "";
    return;
  }
  statusEl.innerHTML = voter.hasVoted
    ? `<span class="tag tag-seal" style="margin-top:0.5rem; display:inline-block;">Already voted — pick a different voter</span>`
    : `<span class="tag tag-success" style="margin-top:0.5rem; display:inline-block;">Eligible to vote</span>`;
}

function renderTurnout() {
  const voters = Object.values(votersById);
  const voted = voters.filter((v) => v.hasVoted);
  const remaining = voters.filter((v) => !v.hasVoted);

  document.getElementById("turnout-voted").textContent = voted.length;
  document.getElementById("turnout-remaining").textContent = remaining.length;

  listEl.innerHTML = "";
  emptyEl.style.display = voters.length ? "none" : "block";

  voters.forEach((voter, index) => {
    const li = document.createElement("li");
    li.className = "roll-row";
    li.innerHTML = `
      <span class="roll-number">${index + 1}</span>
      <span class="roll-main">
        <strong>${escapeHtml(voter.name)}</strong>
      </span>
      <span class="tag ${voter.hasVoted ? "tag-success" : ""}">${voter.hasVoted ? "Voted" : "Not yet voted"}</span>
    `;
    listEl.appendChild(li);
  });
}

function validate() {
  let valid = true;
  document.getElementById("err-voter").textContent = "";
  document.getElementById("err-candidate").textContent = "";

  const selectedVoter = votersById[Number(voterSelect.value)];
  if (!voterSelect.value) {
    document.getElementById("err-voter").textContent = "Choose who is voting.";
    valid = false;
  } else if (selectedVoter && selectedVoter.hasVoted) {
    document.getElementById("err-voter").textContent = "This voter has already voted.";
    valid = false;
  }
  if (!candidateSelect.value) {
    document.getElementById("err-candidate").textContent = "Choose a candidate.";
    valid = false;
  }
  return valid;
}

voteForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!validate()) return;

  const payload = {
    voterId: Number(voterSelect.value),
    candidateId: Number(candidateSelect.value),
  };

  submitBtn.disabled = true;
  try {
    await apiRequest("/api/votes/cast", { method: "POST", body: payload });
    showToast("Vote cast successfully.", "success");
    voteForm.reset();
    await loadOptions();
    renderTurnout();
  } catch (err) {
    showToast(err.message, "error");
  } finally {
    submitBtn.disabled = false;
  }
});

voterSelect.addEventListener("change", updateVoterStatus);

async function init() {
  await loadOptions();
  renderTurnout();
}

document.addEventListener("DOMContentLoaded", init);
