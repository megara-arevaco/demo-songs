const API_BASE_URL = import.meta.env.VITE_API_URL ?? `http://localhost:3000`;

export async function apiFetch(input: string, init?: RequestInit) {
  const res = await fetch(`${API_BASE_URL}${input}`, init);

  if (!res.ok) {
    const body = await res.text().catch(() => "");

    throw new Error(
      `HTTP ${res.status}: ${res.statusText}${body ? ` - ${body}` : ""}`
    );
  }

  return res;
}
