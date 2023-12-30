import cors from "@fastify/cors";
import { AppRouter, appRouter } from "@pg-boss-studio/api";
import {
  FastifyTRPCPluginOptions,
  fastifyTRPCPlugin,
} from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import { Client } from "pg";

import { createTRPCContext } from "../../../packages/api/src/trpc";

async function main() {
  try {
    const client = new Client({
      connectionString: "postgres://user:password@localhost:5432/dev",
    });
    await client.connect();

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
      trpcOptions: {
        router: appRouter,
        createContext: () => createTRPCContext({ db: client }),
        onError({ error, path }) {
          console.error(`>>> tRPC Error on '${path}'`, error);
        },
      },
    } satisfies FastifyTRPCPluginOptions<AppRouter>);

    await server.listen({ port: 3001 });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

void main();
