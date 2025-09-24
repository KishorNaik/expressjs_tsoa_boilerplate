import { mergeRouters } from '@/config/trpc';

// TRPC
const trpcModulesFederation = mergeRouters();
type TRPCAppRouter = typeof trpcModulesFederation;

export { trpcModulesFederation, TRPCAppRouter };
