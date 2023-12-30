import { PgBossRouter } from "./router/pg-boss";
import { router } from "./trpc";

export const appRouter = router({
  pgBoss: PgBossRouter,
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
