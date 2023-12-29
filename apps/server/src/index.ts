import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import cors from "@fastify/cors";

import { appRouter } from "@pg-boss-studio/api";

async function main() {
  try {
    const server = fastify({
      maxParamLength: 5000,
    });
    await server.register(cors, {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Accept",
        "Content-Type",
        "Authorization",
      ],
    });

    server.register(fastifyTRPCPlugin, {
      prefix: "/trpc",
      trpcOptions: { router: appRouter },
    });

    await server.listen({ port: 3001 });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

void main();
