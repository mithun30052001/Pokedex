import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import { appRouter } from './trpcRouter';

const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({});
const app = express();

app.use(cors());
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});