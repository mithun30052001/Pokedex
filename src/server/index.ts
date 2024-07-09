import express from 'express';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './trpcRouter';

const app = express();

app.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext() {
        return {};
    },
  })
);

app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});