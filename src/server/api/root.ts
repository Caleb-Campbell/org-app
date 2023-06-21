import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { crowRouter } from "~/server/api/routers/crow.router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  crow: crowRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
