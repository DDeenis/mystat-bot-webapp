import { mergeRouters } from "../trpc";
import { mystatRouter } from "./mystat";
import { themeRouter } from "./theme";

export const appRouter = mergeRouters(mystatRouter, themeRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
