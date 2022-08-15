import { createRouter } from "../context";
import { userRouter } from "./user";

export const appRouter = createRouter().merge("user.", userRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
