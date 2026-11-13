async function loadStats() {
  const votersEl = document.getElementById("stat-voters");
  const candidatesEl = document.getElementById("stat-candidates");
  const votesEl = document.getElementById("stat-votes");

  try {
    const [voters, candidates, votes] = await Promise.all([
      apiRequest("/api/voters"),
      apiRequest("/api/candidate"),
      apiRequest("/api/votes"),
    ]);
    votersEl.textContent = voters.length;
    candidatesEl.textContent = candidates.length;
    votesEl.textContent = votes.length;
  } catch (err) {
    votersEl.textContent = "–";
    candidatesEl.textContent = "–";
    votesEl.textContent = "–";
    showToast(err.message, "error");
  }
}

document.addEventListener("DOMContentLoaded", loadStats);
