import { ZodError } from 'zod';

import { appRouter } from '../../../server/routers/_app';

import * as trpcNext from '@trpc/server/adapters/next';

// Export API handler
export default trpcNext.createNextApiHandler({
  onError: ({ error }) => {
    if (error.cause instanceof ZodError) {
      // Return the first zod error message to client
      error.message = JSON.parse(error.message)[0].message;
    }
  },
  router: appRouter,
});
