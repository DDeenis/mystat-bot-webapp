import { z } from "zod";
import { createRouter } from "../context";

export const userRouter = createRouter().query("login", {
  input: z.object({
    username: z.string(),
    password: z.string(),
  }),
  async resolve({ input }) {
    const result = await fetch("https://msapi.itstep.org/api/v2/auth/login", {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "ru_RU, ru",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        application_key:
          "6a56a5df2667e65aab73ce76d1dd737f7d1faef9c52e8b8c55ac75f565d8e8a6",
        id_city: null,
        username: input.username,
        password: input.password,
      }),
      method: "POST",
    });
    return await result.json();
  },
});

export const UserRouter = typeof userRouter;
