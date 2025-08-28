import Fastify from "fastify";
import { songsRoutes } from "./routes";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import cors from "@fastify/cors";

const app = Fastify({ logger: true })
  .setValidatorCompiler(validatorCompiler)
  .setSerializerCompiler(serializerCompiler)
  .withTypeProvider<ZodTypeProvider>()
  .register(cors, {
    origin: true,
  });

app.register(songsRoutes, { prefix: "/api/v1" });

app.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
  if (err) throw err;
  app.log.info(`Server running at ${address}`);
});

export default app;
