import { z } from "zod";
import { createRouter } from "../context";
import { getAllThemes, getTheme, upsertTheme } from "../database/themes";
import { publicProcedure, router } from "../trpc";

export const themeRouter = router({
  theme: router({
    get: publicProcedure
      .input(
        z.object({
          id: z.number(),
        })
      )
      .query(({ input: { id } }) => getTheme(id)),
    getAll: publicProcedure.query(() => getAllThemes()),
    upsert: publicProcedure
      .input(
        z.object({
          themeJson: z.string(),
          themeId: z.number().optional(),
        })
      )
      .query(({ input: { themeJson, themeId } }) =>
        upsertTheme(JSON.parse(themeJson), themeId)
      ),
  }),
});

export type ThemeRouter = typeof themeRouter;
