const voterForm = document.getElementById("voter-form");
const voterIdField = document.getElementById("voter-id");
const nameField = document.getElementById("voter-name");
const emailField = document.getElementById("voter-email");
const submitBtn = document.getElementById("voter-submit");
const cancelBtn = document.getElementById("voter-cancel");
const formTitle = document.getElementById("form-title");
const listEl = document.getElementById("voter-list");
const emptyEl = document.getElementById("voter-empty");

function resetForm() {
  voterForm.reset();
  voterIdField.value = "";
  submitBtn.textContent = "Register voter";
  formTitle.textContent = "Register a voter";
  cancelBtn.style.display = "none";
  document.getElementById("err-name").textContent = "";
  document.getElementById("err-email").textContent = "";
}

function startEdit(voter) {
  voterIdField.value = voter.id;
  nameField.value = voter.name;
  emailField.value = voter.email;
  submitBtn.textContent = "Save changes";
  formTitle.textContent = `Editing ${voter.name}`;
  cancelBtn.style.display = "inline-flex";
  nameField.focus();
}

function renderVoters(voters) {
  listEl.innerHTML = "";
  emptyEl.style.display = voters.length ? "none" : "block";

  voters.forEach((voter, index) => {
    const li = document.createElement("li");
    li.className = "roll-row";
    li.innerHTML = `
      <span class="roll-number">${index + 1}</span>
      <span class="roll-main">
        <strong>${escapeHtml(voter.name)}</strong>
        <span class="roll-meta">${escapeHtml(voter.email)}
          <span class="tag ${voter.hasVoted ? "tag-success" : ""}">${voter.hasVoted ? "Voted" : "Not yet voted"}</span>
        </span>
      </span>
      <span class="roll-actions">
        <button class="btn btn-small btn-outline" data-action="edit">Edit</button>
        <button class="btn btn-small btn-danger" data-action="delete">Delete</button>
      </span>
    `;
    li.querySelector('[data-action="edit"]').addEventListener("click", () => startEdit(voter));
    li.querySelector('[data-action="delete"]').addEventListener("click", () => deleteVoter(voter));
    listEl.appendChild(li);
  });
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}

async function loadVoters() {
  try {
    const voters = await apiRequest("/api/voters");
    renderVoters(voters);
  } catch (err) {
    showToast(err.message, "error");
  }
}

async function deleteVoter(voter) {
  if (!confirm(`Remove ${voter.name} from the voter roll?`)) return;
  try {
    await apiRequest(`/api/voters/delete/${voter.id}`, { method: "DELETE" });
    showToast(`${voter.name} removed.`, "success");
    loadVoters();
  } catch (err) {
    showToast(err.message, "error");
  }
}

function validate() {
  let valid = true;
  document.getElementById("err-name").textContent = "";
  document.getElementById("err-email").textContent = "";

  if (!nameField.value.trim()) {
    document.getElementById("err-name").textContent = "Name is required.";
    valid = false;
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailField.value.trim())) {
    document.getElementById("err-email").textContent = "Enter a valid email address.";
    valid = false;
  }
  return valid;
}

voterForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!validate()) return;

  const payload = { name: nameField.value.trim(), email: emailField.value.trim() };
  const editingId = voterIdField.value;

  submitBtn.disabled = true;
  try {
    if (editingId) {
      await apiRequest(`/api/voters/update/${editingId}`, { method: "PUT", body: payload });
      showToast("Voter updated.", "success");
    } else {
      await apiRequest("/api/voters/register", { method: "POST", body: payload });
      showToast("Voter registered.", "success");
    }
    resetForm();
    loadVoters();
  } catch (err) {
    showToast(err.message, "error");
  } finally {
    submitBtn.disabled = false;
  }
});

cancelBtn.addEventListener("click", resetForm);
document.getElementById("refresh-voters").addEventListener("click", loadVoters);
document.addEventListener("DOMContentLoaded", loadVoters);
