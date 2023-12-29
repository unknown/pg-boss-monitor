import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  helloWorld: publicProcedure.query(() => "Hello world!"),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
