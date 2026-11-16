export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });

  if (!res.ok) {
    throw new Error(`Eroare server: ${res.status}`);
  }

  return res.status === 204 ? null : res.json();
}

export function fetchPoze() {
  return request("/poze");
}

export function fetchPoza(id) {
  return request(`/poze/${id}`);
}

export function createPoza(poza) {
  return request("/poze", {
    method: "POST",
    body: JSON.stringify(poza),
  });
}

export function updatePoza(id, changes) {
  return request(`/poze/${id}`, {
    method: "PATCH",
    body: JSON.stringify(changes),
  });
}

export function deletePoza(id) {
  return request(`/poze/${id}`, {
    method: "DELETE",
  });
}