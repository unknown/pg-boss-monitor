import { initTRPC } from "@trpc/server";
import { Client } from "pg";

export const createTRPCContext = async (opts: { db: Client }) => {
  const { db } = opts;

  return {
    db,
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
