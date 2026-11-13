const candidateForm = document.getElementById("candidate-form");
const candidateIdField = document.getElementById("candidate-id");
const nameField = document.getElementById("candidate-name");
const partyField = document.getElementById("candidate-party");
const submitBtn = document.getElementById("candidate-submit");
const cancelBtn = document.getElementById("candidate-cancel");
const formTitle = document.getElementById("form-title");
const listEl = document.getElementById("candidate-list");
const emptyEl = document.getElementById("candidate-empty");

function resetForm() {
  candidateForm.reset();
  candidateIdField.value = "";
  submitBtn.textContent = "Register candidate";
  formTitle.textContent = "Register a candidate";
  cancelBtn.style.display = "none";
  document.getElementById("err-name").textContent = "";
  document.getElementById("err-party").textContent = "";
}

function startEdit(candidate) {
  candidateIdField.value = candidate.id;
  nameField.value = candidate.name;
  partyField.value = candidate.party;
  submitBtn.textContent = "Save changes";
  formTitle.textContent = `Editing ${candidate.name}`;
  cancelBtn.style.display = "inline-flex";
  nameField.focus();
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}

function renderCandidates(candidates) {
  listEl.innerHTML = "";
  emptyEl.style.display = candidates.length ? "none" : "block";

  candidates.forEach((candidate, index) => {
    const li = document.createElement("li");
    li.className = "roll-row";
    li.innerHTML = `
      <span class="roll-number">${index + 1}</span>
      <span class="roll-main">
        <strong>${escapeHtml(candidate.name)}</strong>
        <span class="roll-meta">${escapeHtml(candidate.party)}
          <span class="tag">${candidate.voteCount} vote${candidate.voteCount === 1 ? "" : "s"}</span>
        </span>
      </span>
      <span class="roll-actions">
        <button class="btn btn-small btn-outline" data-action="edit">Edit</button>
        <button class="btn btn-small btn-danger" data-action="delete">Delete</button>
      </span>
    `;
    li.querySelector('[data-action="edit"]').addEventListener("click", () => startEdit(candidate));
    li.querySelector('[data-action="delete"]').addEventListener("click", () => deleteCandidate(candidate));
    listEl.appendChild(li);
  });
}

async function loadCandidates() {
  try {
    const candidates = await apiRequest("/api/candidate");
    renderCandidates(candidates);
  } catch (err) {
    showToast(err.message, "error");
  }
}

async function deleteCandidate(candidate) {
  if (!confirm(`Remove ${candidate.name} from the ballot?`)) return;
  try {
    await apiRequest(`/api/candidate/delete/${candidate.id}`, { method: "DELETE" });
    showToast(`${candidate.name} removed.`, "success");
    loadCandidates();
  } catch (err) {
    showToast(err.message, "error");
  }
}

function validate() {
  let valid = true;
  document.getElementById("err-name").textContent = "";
  document.getElementById("err-party").textContent = "";

  if (!nameField.value.trim()) {
    document.getElementById("err-name").textContent = "Name is required.";
    valid = false;
  }
  if (!partyField.value.trim()) {
    document.getElementById("err-party").textContent = "Party is required.";
    valid = false;
  }
  return valid;
}

candidateForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!validate()) return;

  const payload = { name: nameField.value.trim(), party: partyField.value.trim() };
  const editingId = candidateIdField.value;

  submitBtn.disabled = true;
  try {
    if (editingId) {
      await apiRequest(`/api/candidate/update/${editingId}`, { method: "PUT", body: payload });
      showToast("Candidate updated.", "success");
    } else {
      await apiRequest("/api/candidate/add", { method: "POST", body: payload });
      showToast("Candidate registered.", "success");
    }
    resetForm();
    loadCandidates();
  } catch (err) {
    showToast(err.message, "error");
  } finally {
    submitBtn.disabled = false;
  }
});

cancelBtn.addEventListener("click", resetForm);
document.getElementById("refresh-candidates").addEventListener("click", loadCandidates);
document.addEventListener("DOMContentLoaded", loadCandidates);
