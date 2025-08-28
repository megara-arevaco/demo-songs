import { FastifyPluginAsync } from "fastify";
import { SongsResponseSchema } from "@demo-songs/schemas";
import songsController from "../controllers/songs.controller";

export const songsRoutes: FastifyPluginAsync = async (app) => {
  app.get(
    "/songs",
    {
      schema: {
        response: {
          200: SongsResponseSchema,
        },
      },
    },
    songsController.getAll
  );
};
