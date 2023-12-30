import { publicProcedure, router } from "../trpc";

// TODO: env variable
const schema = "pgboss";

const JOB_STATES = [
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

    return rows;
  }),
  getJobs: publicProcedure.query(async ({ ctx }) => {
    const { rows } = await ctx.db.query(
      `select * from ${schema}.job where state = ANY($1::${schema}.job_state[]);`,
      [JOB_STATES]
    );

    return rows;
  }),
});
