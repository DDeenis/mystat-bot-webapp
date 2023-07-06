import { ThemeInfo } from "../../utils/themes";
import { supabase } from "./database";

const themesTable = "themes";

export const getTheme = async (id: number): Promise<ThemeInfo | undefined> => {
  const { data, error } = await supabase
    .from(themesTable)
    .select("id, theme")
    .eq("id", id);

  if (error) throw error;

  return data?.[0];
};

export const getAllThemes = async (): Promise<ThemeInfo[] | undefined> => {
  const { data, error } = await supabase.from(themesTable).select("id, theme");

  if (error) throw error;

  return data;
};

export const upsertTheme = async (theme: ThemeInfo, themeId?: number) => {
  if (!themeId) {
    await supabase.from(themesTable).insert({ theme: theme });
  }

  await supabase.from(themesTable).update({ theme: theme }).eq("id", themeId);
};
