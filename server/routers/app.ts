import { createRouter } from "../context";
import { mystatRouter } from "./mystat";

export const appRouter = createRouter().merge("mystat.", mystatRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
