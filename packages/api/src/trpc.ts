import { initTRPC } from "@trpc/server";
import PgBoss from "pg-boss";

export const createTRPCContext = async (opts: { boss: PgBoss }) => {
  const { boss } = opts;

  return {
    boss,
  };
};

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<typeof createTRPCContext>().create();

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;
