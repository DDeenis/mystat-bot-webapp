import { createRouter } from "../context";
import { mystatRouter } from "./mystat";
import { themeRouter } from "./theme";

export const appRouter = createRouter()
  .merge("mystat.", mystatRouter)
  .merge("theme.", themeRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
