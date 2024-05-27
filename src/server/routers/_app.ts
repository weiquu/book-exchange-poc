import { booksRouter } from "./books";
import { usersRouter } from "./users";
import { router } from "../trpc";

export const appRouter = router({
  books: booksRouter,
  users: usersRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;
