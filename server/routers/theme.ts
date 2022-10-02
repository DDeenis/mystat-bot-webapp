import { z } from "zod";
import { createRouter } from "../context";
import { getAllThemes, getTheme, upsertTheme } from "../database/themes";

export const themeRouter = createRouter()
  .query("get", {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ input: { id } }) {
      return getTheme(id);
    },
  })
  .query("getAll", {
    async resolve() {
      return getAllThemes();
    },
  })
  .mutation("upsert", {
    input: z.object({
      themeJson: z.string(),
      themeId: z.number().optional(),
    }),
    async resolve({ input: { themeJson, themeId } }) {
      await upsertTheme(JSON.parse(themeJson), themeId);
    },
  });

export type ThemeRouter = typeof themeRouter;
