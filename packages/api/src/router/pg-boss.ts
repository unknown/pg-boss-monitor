import { publicProcedure, router } from "../trpc";

export const PgBossRouter = router({
  getSchedules: publicProcedure.query(({ ctx }) => {
    return ctx.boss.getSchedules();
  }),
});
