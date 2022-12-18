import { initTRPC } from "@trpc/server";
import { UserContext } from "./context";

export const t = initTRPC.context<UserContext>().create();
/**
 * We recommend only exporting the functionality that we
 * use so we can enforce which base procedures should be used
 **/
export const router = t.router;
export const mergeRouters = t.mergeRouters;
export const publicProcedure = t.procedure;
