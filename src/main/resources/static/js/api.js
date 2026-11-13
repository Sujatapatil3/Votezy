/* ============================================================
   Votezy — shared API + UI helpers
   Loaded on every page before the page-specific script.
   ============================================================ */

/**
 * Wraps fetch() for the Votezy backend.
 * - Sends/reads JSON automatically.
 * - Throws an Error with the best available message on failure,
 *   so callers can just try/catch and show it.
 */
async function apiRequest(path, { method = "GET", body } = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      method,
      headers: body ? { "Content-Type": "application/json" } : {},
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (networkError) {
    throw new Error(
      `Could not reach the server at ${API_BASE}. Is Spring Boot running and CORS enabled?`
    );
  }

  const raw = await response.text();
  let data = null;
  if (raw) {
    try {
      data = JSON.parse(raw);
    } catch {
      data = raw; // backend returned a plain string, e.g. delete confirmations
    }
  }

  if (!response.ok) {
    const message =
      (data && typeof data === "object" && (data.message || data.error)) ||
      (typeof data === "string" && data) ||
      `Request failed (${response.status})`;
    throw new Error(message);
  }

  return data;
}

/* ---------- toast notifications ---------- */

function ensureToastStack() {
  let stack = document.getElementById("toast-stack");
  if (!stack) {
    stack = document.createElement("div");
    stack.id = "toast-stack";
    document.body.appendChild(stack);
  }
  return stack;
}

function showToast(message, type = "info") {
  const stack = ensureToastStack();
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  stack.appendChild(toast);
  setTimeout(() => toast.remove(), 4200);
}

/* ---------- backend connection status (shown in footer) ---------- */

async function refreshConnectionStatus() {
  const dot = document.getElementById("status-dot");
  const label = document.getElementById("status-label");
  if (!dot || !label) return;

  try {
    await apiRequest("/api/candidate");
    dot.className = "status-dot online";
    label.textContent = `Connected to ${API_BASE}`;
  } catch {
    dot.className = "status-dot offline";
    label.textContent = `Not reachable at ${API_BASE}`;
  }
}

document.addEventListener("DOMContentLoaded", refreshConnectionStatus);
