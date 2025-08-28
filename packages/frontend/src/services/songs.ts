import { SongsResponseSchema } from "@demo-songs/schemas";
import { apiFetch } from "./http";

export async function getSongs(signal?: AbortSignal) {
  const res = await apiFetch("/api/v1/songs", { signal });
  const data = await res.json();

  return SongsResponseSchema.parse(data);
}
