import { z } from "zod";

export const SongSchema = z.object({
  id: z.number(),
  name: z.string(),
  author: z.string(),
  progress: z.number().min(0).max(1),
});

export const SongsResponseSchema = z.array(SongSchema);

export type Song = z.infer<typeof SongSchema>;
export type SongsResponse = z.infer<typeof SongsResponseSchema>;
