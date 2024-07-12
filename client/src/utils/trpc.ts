import { AppRouter } from './../../../server/src/trpc/trpcRouter';
import { createTRPCReact } from '@trpc/react-query';

export const trpc = createTRPCReact<AppRouter>();

