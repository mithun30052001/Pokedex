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

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Server is running on http://localhost:4000');
});