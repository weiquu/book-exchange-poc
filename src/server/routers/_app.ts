import { booksRouter } from './books';
import { router } from '../trpc';

export const appRouter = router({
  books: booksRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;
