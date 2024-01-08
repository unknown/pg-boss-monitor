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
        limit: z.number().default(50),
        offset: z.number().default(0),
      })
    )
    .query(async ({ ctx, input }) => {
      const { rows } = await ctx.db.query(
        `select * from ${schema}.job where name = $1 and state = $2::${schema}.job_state order by completedon desc limit $3 offset $4;`,
        [input.queue, input.state, input.limit, input.offset]
      );

      return rows as JobWithMetadata[];
    }),
  countJobs: publicProcedure
    .input(
      z.object({
        queue: z.string(),
        state: z.enum(JobStates),
      })
    )
    .query(async ({ ctx, input }) => {
      const { rows } = await ctx.db.query(
        `select count(*) from ${schema}.job where name = $1 and state = $2::${schema}.job_state;`,
        [input.queue, input.state]
      );

      return rows[0].count as number;
    }),
  getQueues: publicProcedure.query(async ({ ctx }) => {
    const { rows } = await ctx.db.query(
      `select distinct name from ${schema}.job order by name asc;`
    );

    return rows.map((row) => row.name) as string[];
  }),
});
