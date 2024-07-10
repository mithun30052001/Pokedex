import type { AppRouter } from './../../../../src/server/trpcRouter';
import { createTRPCReact } from '@trpc/react-query';

export const trpc = createTRPCReact<AppRouter>();

