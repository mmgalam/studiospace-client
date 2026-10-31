export const API = "/server-api";

async function ensureToken() {
  const res = await fetch(`${API}/auth/token`, {
    method: "POST",
    credentials: "include",
  });
  return res.ok;
}

export async function apiFetch(path: string, init: RequestInit = {}) {
  const run = () => fetch(`${API}${path}`, { ...init, credentials: "include" });
  let res = await run();
  if (res.status === 401 && (await ensureToken())) {
    res = await run();
  }
  return res;
}

export async function clearToken() {
  try {
    await fetch(`${API}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch {
    // logout-এর সময় নীরবে উপেক্ষা
  }
}
