import { booksRouter } from "./books";
import { usersRouter } from "./users";
import { exchangesRouter } from "./exchanges";
import { router } from "../trpc";

export const appRouter = router({
  books: booksRouter,
  exchanges: exchangesRouter,
  users: usersRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;
