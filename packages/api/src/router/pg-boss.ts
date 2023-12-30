import { JobWithMetadata, Schedule } from "pg-boss";
import { z } from "zod";

import { publicProcedure, router } from "../trpc";

const schema = process.env.PG_BOSS_SCHEMA ?? "pgboss";

const JobStates = [
  "created",
  "retry",
  "active",
  "completed",
  "expired",
  "cancelled",
  "failed",
] as const;

export const PgBossRouter = router({
  getSchedules: publicProcedure.query(async ({ ctx }) => {
    const { rows } = await ctx.db.query(`select * from ${schema}.schedule;`);

    return rows as Schedule[];
  }),
  getJobs: publicProcedure
    .input(
      z.object({
        queue: z.string(),
        state: z.enum(JobStates),
        limit: z.number().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { rows } = await ctx.db.query(
        `select * from ${schema}.job where name = $1 and state = $2::${schema}.job_state;`,
        [input.queue, input.state]
      );

      return rows as JobWithMetadata[];
    }),
  getQueues: publicProcedure.query(async ({ ctx }) => {
    const { rows } = await ctx.db.query(
      `select distinct name from ${schema}.job order by name asc;`
    );

    return rows.map((row) => row.name) as string[];
  }),
});
